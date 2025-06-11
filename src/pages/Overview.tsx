export default function Overview() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-azure-24 mb-4">
          Overview Dashboard
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome to your dashboard overview. This is where you can see all your
          key metrics and insights.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              Total Tasks
            </h3>
            <p className="text-3xl font-bold text-blue-700 mt-2">248</p>
            <p className="text-sm text-blue-600 mt-1">+12% from last month</p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
            <h3 className="text-sm font-semibold text-green-600 uppercase tracking-wide">
              Completed
            </h3>
            <p className="text-3xl font-bold text-green-700 mt-2">186</p>
            <p className="text-sm text-green-600 mt-1">+8% from last month</p>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
            <h3 className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
              Pending
            </h3>
            <p className="text-3xl font-bold text-orange-700 mt-2">42</p>
            <p className="text-sm text-orange-600 mt-1">-5% from last month</p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
            <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
              Team Members
            </h3>
            <p className="text-3xl font-bold text-purple-700 mt-2">24</p>
            <p className="text-sm text-purple-600 mt-1">+2 new this month</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-azure-24 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-azure-24">
                  Task "Website Redesign" completed
                </p>
                <p className="text-xs text-gray-500">
                  2 hours ago by John Smith
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-azure-24">
                  New project "Mobile App" created
                </p>
                <p className="text-xs text-gray-500">
                  4 hours ago by Sarah Johnson
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-azure-24">
                  Meeting "Sprint Planning" scheduled
                </p>
                <p className="text-xs text-gray-500">
                  6 hours ago by Team Lead
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
