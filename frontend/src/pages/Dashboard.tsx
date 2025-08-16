import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, 
  Star, 
  Calendar, 
  Award, 
  TrendingUp, 
  Users, 
  MessageSquare,
  Settings,
  ChevronRight,
  UserPlus
} from 'lucide-react';
import { useAccount } from 'wagmi';
import { useApiCurrentUser, useApiIsRegistered } from '@/hooks/use-api';
import { useTotalUsers } from '@/hooks/use-womantech';
import { RegistrationModal } from '@/components/RegistrationModal';
import { ContractStatus } from '@/components/ContractStatus';

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { user, isLoading: userLoading } = useApiCurrentUser();
  const { isRegistered } = useApiIsRegistered();
  const { total: totalUsers } = useTotalUsers();
  const [showRegistration, setShowRegistration] = useState(false);

  // Mock data for achievements and activity (these would come from events in a full implementation)
  const achievements = ['First Session', 'Top Mentor', '50 Sessions'];
  const recentActivity = [
    { type: 'session', description: 'Mentorship session with Maria Rodriguez', time: '2 hours ago' },
    { type: 'reputation', description: 'Gained 5 reputation points', time: '1 day ago' },
    { type: 'member', description: 'New member Jennifer Wu joined', time: '2 days ago' },
  ];

  const dashboardStats = [
    { 
      title: 'Reputation Score', 
      value: user?.reputation ? Number(user.reputation) : 0, 
      icon: Star, 
      description: 'Your mentorship rating' 
    },
    { 
      title: 'Sessions Completed', 
      value: 0, // TODO: Track sessions from events
      icon: Calendar, 
      description: 'Total mentorship sessions' 
    },
    { 
      title: 'Active Connections', 
      value: 0, // TODO: Track connections
      icon: Users, 
      description: 'Current mentees/mentors' 
    },
    { 
      title: 'Total Users', 
      value: totalUsers ? Number(totalUsers) : 0, 
      icon: TrendingUp, 
      description: 'Community members' 
    },
  ];

  if (!isConnected) {
    return (
      <div className="py-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Connect Your Wallet
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Please connect your wallet to access your dashboard and view your mentorship activity.
          </p>
        </div>
      </div>
    );
  }

  if (userLoading) {
    return (
      <div className="py-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Loading...
          </h1>
          <p className="text-muted-foreground">
            Fetching your profile data from the blockchain.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Hi {user?.name || 'User'}!
          </h1>
          <div className="flex items-center space-x-4">
            <Badge variant={user?.role === 'MENTOR' ? 'default' : 'secondary'}>
              {user?.role === 'MENTOR' ? 'Mentor' : user?.role === 'MENTEE' ? 'Mentee' : 'Unknown'}
            </Badge>
            <div className="flex items-center space-x-1 text-secondary">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">{user?.reputation ? Number(user.reputation) : 0} reputation</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 lg:mt-0 flex space-x-3">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          {!isRegistered && (
            <Button onClick={() => setShowRegistration(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Register
            </Button>
          )}
          {isRegistered && (
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              New Session
            </Button>
          )}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks to help you get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {!isRegistered && (
                <Button 
                  className="w-full justify-between" 
                  variant="outline"
                  onClick={() => setShowRegistration(true)}
                >
                  Complete Registration
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              <Button className="w-full justify-between" variant="outline">
                Find {user?.role === 'MENTOR' ? 'Mentees' : 'Mentors'}
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button className="w-full justify-between" variant="outline">
                Schedule Session
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button className="w-full justify-between" variant="outline">
                Update Profile
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest mentorship activity and community updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      {activity.type === 'session' && <Calendar className="h-4 w-4 text-primary" />}
                      {activity.type === 'reputation' && <Star className="h-4 w-4 text-secondary" />}
                      {activity.type === 'member' && <Users className="h-4 w-4 text-accent" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-secondary" />
              Achievements
            </CardTitle>
            <CardDescription>
              Milestones you've reached in your mentorship journey
            </CardDescription>
          </CardHeader>
                      <CardContent>
              <div className="flex flex-wrap gap-3">
                {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Badge variant="secondary" className="px-3 py-1">
                    <Award className="h-3 w-3 mr-1" />
                    {achievement}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contract Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <ContractStatus />
      </motion.div>

      {/* Registration Modal */}
      <RegistrationModal 
        isOpen={showRegistration} 
        onClose={() => setShowRegistration(false)} 
      />
    </div>
  );
}