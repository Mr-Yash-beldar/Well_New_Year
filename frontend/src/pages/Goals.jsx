import { useState } from 'react'
import { useGoals, useCreateGoal, useUpdateGoal, useDeleteGoal } from '../hooks/useGoals'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { PlusIcon, TrashIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline'

const Goals = () => {
  const [filter, setFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  const [formData, setFormData] = useState({
    type: 'weight',
    title: '',
    target: '',
    unit: 'kg',
    current: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
  })

  const { data: goalsData, isLoading } = useGoals(filter === 'all' ? {} : { status: filter })
  const createGoal = useCreateGoal()
  const updateGoal = useUpdateGoal()
  const deleteGoal = useDeleteGoal()

  const goalTypes = [
    { value: 'weight', label: 'Weight Management', unit: 'kg' },
    { value: 'water', label: 'Water Intake', unit: 'liters' },
    { value: 'steps', label: 'Daily Steps', unit: 'steps' },
    { value: 'calories', label: 'Calorie Intake', unit: 'kcal' },
    { value: 'exercise', label: 'Exercise Minutes', unit: 'minutes' },
    { value: 'custom', label: 'Custom Goal', unit: '' },
  ]

  const handleTypeChange = (type) => {
    const selectedType = goalTypes.find((t) => t.value === type)
    setFormData({
      ...formData,
      type,
      unit: selectedType?.unit || '',
      title: type === 'custom' ? '' : selectedType?.label || '',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingGoal) {
        await updateGoal.mutateAsync({
          id: editingGoal._id,
          data: formData,
        })
        toast.success('Goal updated successfully!')
      } else {
        await createGoal.mutateAsync(formData)
        toast.success('Goal created successfully!')
      }

      setShowModal(false)
      setEditingGoal(null)
      setFormData({
        type: 'weight',
        title: '',
        target: '',
        unit: 'kg',
        current: 0,
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save goal')
    }
  }

  const handleEdit = (goal) => {
    setEditingGoal(goal)
    setFormData({
      type: goal.type,
      title: goal.title,
      target: goal.target,
      unit: goal.unit,
      current: goal.current,
      startDate: new Date(goal.startDate).toISOString().split('T')[0],
      endDate: new Date(goal.endDate).toISOString().split('T')[0],
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await deleteGoal.mutateAsync(id)
        toast.success('Goal deleted successfully!')
      } catch (error) {
        toast.error('Failed to delete goal')
      }
    }
  }

  const handleUpdateProgress = async (goalId, newCurrent) => {
    try {
      await updateGoal.mutateAsync({
        id: goalId,
        data: { current: newCurrent },
      })
      toast.success('Progress updated!')
    } catch (error) {
      toast.error('Failed to update progress')
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Goals</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and manage your wellness goals</p>
        </div>
        <button
          onClick={() => {
            setEditingGoal(null)
            setFormData({
              type: 'weight',
              title: '',
              target: '',
              unit: 'kg',
              current: 0,
              startDate: new Date().toISOString().split('T')[0],
              endDate: '',
            })
            setShowModal(true)
          }}
          className="btn btn-primary"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          New Goal
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {['all', 'active', 'completed', 'paused'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              filter === status
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Goals Grid */}
      {goalsData?.data?.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 mb-4">No goals found</p>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            Create your first goal
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goalsData?.data?.map((goal) => (
            <div key={goal._id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{goal.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {goal.type.charAt(0).toUpperCase() + goal.type.slice(1)} Goal
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(goal)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    title="Edit goal"
                  >
                    <PencilIcon className="w-5 h-5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(goal._id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    title="Delete goal"
                  >
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-bold text-primary-600">
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    {goal.progressPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                  <div
                    className="bg-primary-600 h-3 rounded-full transition-all"
                    style={{ width: `${Math.min(goal.progressPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Update Progress */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Update Current Progress</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    defaultValue={goal.current}
                    className="input flex-1"
                    placeholder="Current value"
                    onBlur={(e) => {
                      const newValue = parseFloat(e.target.value)
                      if (newValue !== goal.current && !isNaN(newValue)) {
                        handleUpdateProgress(goal._id, newValue)
                      }
                    }}
                  />
                  <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    {goal.unit}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex justify-between items-center text-sm">
                <span
                  className={`px-3 py-1 rounded-full ${
                    goal.status === 'active'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : goal.status === 'completed'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : goal.status === 'paused'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {goal.status}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Due: {new Date(goal.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Goal Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {editingGoal ? 'Edit Goal' : 'Create New Goal'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setEditingGoal(null)
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Goal Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">Goal Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleTypeChange(e.target.value)}
                    className="input w-full"
                    required
                  >
                    {goalTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">Goal Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="input w-full"
                    placeholder="e.g., Lose 10kg by summer"
                    required
                  />
                </div>

                {/* Target and Unit */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Target Value *</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.target}
                      onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                      className="input w-full"
                      placeholder="e.g., 70"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Unit *</label>
                    <input
                      type="text"
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="input w-full"
                      placeholder="e.g., kg"
                      required
                    />
                  </div>
                </div>

                {/* Current Value */}
                <div>
                  <label className="block text-sm font-medium mb-2">Current Value</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.current}
                    onChange={(e) => setFormData({ ...formData, current: e.target.value })}
                    className="input w-full"
                    placeholder="Starting value"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Date *</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="input w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">End Date *</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="input w-full"
                      min={formData.startDate}
                      required
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={createGoal.isPending || updateGoal.isPending}
                    className="btn btn-primary flex-1"
                  >
                    {createGoal.isPending || updateGoal.isPending ? (
                      <>
                        <Spinner size="sm" className="mr-2" />
                        {editingGoal ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>{editingGoal ? 'Update Goal' : 'Create Goal'}</>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      setEditingGoal(null)
                    }}
                    className="btn btn-outline flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Goals
