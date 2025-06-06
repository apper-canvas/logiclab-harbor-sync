import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Icon from '../atoms/Icon';
import Title from '../atoms/Title';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { dailyChallengeService } from '../../services';

const DailyChallengeCard = ({ onStartChallenge }) => {
  const [challenge, setChallenge] = useState(null);
  const [streakInfo, setStreakInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    loadDailyChallenge();
    loadStreakInfo();
  }, []);

  const loadDailyChallenge = async () => {
    try {
      setLoading(true);
      setError(null);
      const todaysChallenge = await dailyChallengeService.getTodaysChallenge();
      setChallenge(todaysChallenge);
    } catch (err) {
      console.error('Error loading daily challenge:', err);
      setError('Failed to load daily challenge');
      toast.error('Failed to load daily challenge');
    } finally {
      setLoading(false);
    }
  };

  const loadStreakInfo = async () => {
    try {
      const streak = await dailyChallengeService.getStreakInfo();
      setStreakInfo(streak);
      
      if (streak.streakReset) {
        toast.info('Your streak was reset due to missed days. Start a new one today!');
      }
    } catch (err) {
      console.error('Error loading streak info:', err);
    }
  };

  const handleCompleteChallenge = async () => {
    if (!challenge || challenge.isCompleted) return;

    try {
      setCompleting(true);
      // Simulate completion time (in real app, this would come from puzzle game)
      const completionTime = Math.floor(Math.random() * 1800) + 300; // 5-35 minutes
      
      const result = await dailyChallengeService.completeChallenge(
        challenge.id, 
        completionTime
      );
      
      setChallenge(result.challenge);
      setStreakInfo(prev => ({
        ...prev,
        currentStreak: result.newStreak,
        lastCompletionDate: new Date().toISOString().split('T')[0]
      }));

      if (result.streakIncreased) {
        toast.success(`🔥 Challenge completed! Streak: ${result.newStreak} days!`);
      } else {
        toast.success('Challenge completed!');
      }
    } catch (err) {
      console.error('Error completing challenge:', err);
      toast.error('Failed to complete challenge');
    } finally {
      setCompleting(false);
    }
  };

  const handleStartChallenge = () => {
    if (challenge && challenge.puzzle && onStartChallenge) {
      onStartChallenge(challenge.puzzle);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'text-green-600 bg-green-50',
      medium: 'text-yellow-600 bg-yellow-50',
      hard: 'text-orange-600 bg-orange-50',
      expert: 'text-red-600 bg-red-50'
    };
    return colors[difficulty] || 'text-gray-600 bg-gray-50';
  };

  const renderStreakFlames = () => {
    if (!streakInfo) return null;
    
    const maxFlames = 7; // Show up to 7 flames for weekly cycle
    const currentStreak = streakInfo.currentStreak;
    
    return (
      <div className="flex items-center space-x-1">
        {[...Array(maxFlames)].map((_, index) => {
          const isActive = index < currentStreak;
          return (
            <div
              key={index}
              className={`w-4 h-4 transition-all duration-300 ${
                isActive 
                  ? 'text-orange-500 streak-flame-active' 
                  : 'text-gray-300'
              }`}
            >
              🔥
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="animate-pulse">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
          <div className="h-10 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <Icon name="AlertCircle" className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <Title className="text-red-700">Daily Challenge</Title>
            <Text className="text-sm text-red-600">Failed to load</Text>
          </div>
        </div>
        <Button
          onClick={loadDailyChallenge}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
        >
          <Icon name="RefreshCw" className="w-4 h-4 inline mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" className="w-8 h-8 text-gray-400" />
          </div>
          <Title className="text-gray-700 mb-2">No Challenge Available</Title>
          <Text className="text-sm text-gray-500 mb-4">
            Check back tomorrow for a new daily challenge!
          </Text>
        </div>
      </div>
    );
  }

  const isCompleted = challenge.isCompleted;
  const hasStreak = streakInfo && streakInfo.currentStreak > 0;

  return (
    <div className={`rounded-xl p-6 border transition-all duration-300 ${
      isCompleted 
        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 hover:shadow-lg'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isCompleted ? 'bg-green-100' : 'bg-blue-100'
          }`}>
            <Icon 
              name={isCompleted ? "CheckCircle" : "Calendar"} 
              className={`w-5 h-5 ${isCompleted ? 'text-green-600' : 'text-blue-600'}`} 
            />
          </div>
          <div>
            <Title className={isCompleted ? 'text-green-700' : 'text-blue-700'}>
              Daily Challenge
            </Title>
            <Text className="text-sm text-gray-600">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </Text>
          </div>
        </div>
        
        {/* Streak Counter */}
        {streakInfo && (
          <div className="text-center">
            {renderStreakFlames()}
            <Text className="text-xs text-gray-500 mt-1">
              {streakInfo.currentStreak} day{streakInfo.currentStreak !== 1 ? 's' : ''}
            </Text>
          </div>
        )}
      </div>

      {/* Challenge Info */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <Title size="sm" className="text-gray-800">
            {challenge.title}
          </Title>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            getDifficultyColor(challenge.difficulty)
          }`}>
            {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
          </span>
        </div>
        <Text className="text-sm text-gray-600 mb-3">
          {challenge.description}
        </Text>

        {/* Completion Status */}
        {isCompleted && (
          <div className="bg-green-100 border border-green-200 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Trophy" className="w-4 h-4 text-green-600" />
                <Text className="text-sm font-medium text-green-700">
                  Completed!
                </Text>
              </div>
              <Text className="text-sm text-green-600">
                {formatTime(challenge.completionTime)}
              </Text>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        {!isCompleted ? (
          <>
            <Button
              onClick={handleStartChallenge}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
              disabled={!challenge.puzzle}
            >
              <Icon name="Play" className="w-4 h-4 inline mr-2" />
              Start Challenge
            </Button>
            
            {/* Demo Complete Button - In real app, this would be triggered by puzzle completion */}
            <Button
              onClick={handleCompleteChallenge}
              disabled={completing}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors text-sm"
            >
              {completing ? (
                <>
                  <Icon name="Loader2" className="w-4 h-4 inline mr-2 animate-spin" />
                  Completing...
                </>
              ) : (
                <>
                  <Icon name="CheckCircle" className="w-4 h-4 inline mr-2" />
                  Demo Complete
                </>
              )}
            </Button>
          </>
        ) : (
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg">
              <Icon name="CheckCircle" className="w-4 h-4" />
              <Text className="font-medium">Challenge Completed!</Text>
            </div>
            <Text className="text-sm text-gray-500 mt-2">
              Come back tomorrow for a new challenge
            </Text>
          </div>
        )}
      </div>

      {/* First Time User Encouragement */}
      {streakInfo && streakInfo.currentStreak === 0 && !isCompleted && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" className="w-4 h-4 text-blue-500" />
            <Text className="text-sm text-blue-700 font-medium">
              Start your streak today!
            </Text>
          </div>
          <Text className="text-xs text-blue-600 mt-1">
            Complete daily challenges to build your solving streak
          </Text>
        </div>
      )}
    </div>
  );
};

export default DailyChallengeCard;