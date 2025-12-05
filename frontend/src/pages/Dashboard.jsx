import { useGoals, useGoalStats } from '../hooks/useGoals'
import { useConsultations } from '../hooks/useConsultations'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { ChartBarIcon, CalendarIcon, TrophyIcon, PlusIcon } from '@heroicons/react/24/outline'

const Dashboard = () => {
  const { data: goalsData, isLoading: goalsLoading } = useGoals({ status: 'active' })
  const { data: statsData, isLoading: statsLoading } = useGoalStats()
  const { data: consultationsData, isLoading: consultationsLoading } = useConsultations()

  const upcomingConsultations = consultationsData?.data
    ?.filter((c) => new Date(c.date) > new Date() && c.status !== 'cancelled')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3)

  if (goalsLoading || statsLoading || consultationsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your progress and manage your wellness journey
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Active Goals</h3>
            <ChartBarIcon className="w-8 h-8 text-primary-600" />
          </div>
          <p className="text-4xl font-bold text-primary-600">{statsData?.data?.active || 0}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {statsData?.data?.completed || 0} completed
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Consultations</h3>
            <CalendarIcon className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-4xl font-bold text-blue-600">{upcomingConsultations?.length || 0}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Upcoming sessions</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Goals</h3>
            <TrophyIcon className="w-8 h-8 text-yellow-600" />
          </div>
          <p className="text-4xl font-bold text-yellow-600">{statsData?.data?.total || 0}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">All time goals</p>
        </div>
      </div>

      {/* Active Goals */}
      <div className="card mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Active Goals</h2>
          <Link to="/goals" className="btn btn-primary btn-sm">
            <PlusIcon className="w-4 h-4 mr-2" />
            Manage Goals
          </Link>
        </div>

        {goalsData?.data?.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No active goals yet</p>
            <Link to="/goals" className="link">
              Create your first goal →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {goalsData?.data?.slice(0, 5).map((goal) => (
              <div
                key={goal._id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{goal.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {goal.current} / {goal.target} {goal.unit}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm dark:bg-primary-900 dark:text-primary-300">
                    {goal.progressPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(goal.progressPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Consultations */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upcoming Consultations</h2>
          <Link to="/book" className="btn btn-outline btn-sm">
            Book New
          </Link>
        </div>

        {!upcomingConsultations || upcomingConsultations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No upcoming consultations</p>
            <Link to="/book" className="link">
              Book your first consultation →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingConsultations.map((consultation) => (
              <div
                key={consultation._id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{consultation.type}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {new Date(consultation.date).toLocaleDateString()} at{' '}
                      {new Date(consultation.date).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    {consultation.notes && (
                      <p className="text-sm text-gray-500 mt-2">{consultation.notes}</p>
                    )}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      consultation.status === 'confirmed'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}
                  >
                    {consultation.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
