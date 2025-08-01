import React from 'react'

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

const Features = () => {
  const features = [
    {
      icon: "⏱",
      title: "Focus Timer",
      description: "Stay in the zone with built-in Pomodoro sessions"
    },
    {
      icon: "📊",
      title: "Daily Code Tracker",
      description: "Track coding hours from GitHub or manual entries"
    },
    {
      icon: "✅",
      title: "Habit Builder",
      description: "Set coding goals and build daily streaks"
    },
    {
      icon: "📈",
      title: "Productivity Reports",
      description: "Visualize your weekly progress with charts"
    },
    {
      icon: "🔔",
      title: "Smart Reminders",
      description: "Nudges to get back on track if you're distracted"
    },
    {
      icon: "🌐",
      title: "Cloud Sync",
      description: "Access your productivity data anywhere"
    }
  ]

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why FocusFlick?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features