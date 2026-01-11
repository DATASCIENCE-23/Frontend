import { Link } from 'react-router-dom';
import { 
  FileText, 
  User, 
  Pill, 
  ClipboardList, 
  Plus,
  TrendingUp
} from 'lucide-react';
import Layout from '../components/Layout';

const Dashboard = () => {
  const quickActions = [
    {
      title: 'New Medical Record',
      description: 'Create a new patient medical record',
      href: '/doctor/record',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'View Patient History',
      description: 'Browse patient medical history',
      href: '/patient/history',
      icon: User,
      color: 'bg-green-500'
    },
    {
      title: 'Create Prescription',
      description: 'Write a new prescription',
      href: '/doctor/prescription',
      icon: Pill,
      color: 'bg-purple-500'
    },
    {
      title: 'Upload Report',
      description: 'Upload medical reports and documents',
      href: '/reports',
      icon: ClipboardList,
      color: 'bg-orange-500'
    }
  ];

  const stats = [
    { name: 'Total Records', value: '2,651', change: '+4.75%', changeType: 'positive' },
    { name: 'Active Prescriptions', value: '1,423', change: '+54.02%', changeType: 'positive' },
    { name: 'Reports Uploaded', value: '892', change: '-1.39%', changeType: 'negative' },
    { name: 'Patients Seen', value: '321', change: '+10.18%', changeType: 'positive' },
  ];

  return (
    <Layout>
      <div className="px-4 sm:px-0">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Electronic Medical Records Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Manage patient records, prescriptions, and medical reports
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((item) => (
            <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {item.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {item.value}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  to={action.href}
                  className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <div>
                    <span className={`${action.color} rounded-lg inline-flex p-3 text-white ring-4 ring-white`}>
                      <Icon className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                      {action.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {action.description}
                    </p>
                  </div>
                  <span className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400">
                    <Plus className="h-6 w-6" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Recent Activity
            </h3>
            <div className="flow-root">
              <ul className="-mb-8">
                <li className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div className="flex-shrink-0">
                      <FileText className="h-8 w-8 rounded-full bg-blue-500 text-white p-1.5" />
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          New medical record created for <span className="font-medium text-gray-900">Patient #1234</span>
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        2 hours ago
                      </div>
                    </div>
                  </div>
                </li>
                <li className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div className="flex-shrink-0">
                      <Pill className="h-8 w-8 rounded-full bg-purple-500 text-white p-1.5" />
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Prescription issued for <span className="font-medium text-gray-900">Patient #5678</span>
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        4 hours ago
                      </div>
                    </div>
                  </div>
                </li>
                <li className="relative">
                  <div className="relative flex space-x-3">
                    <div className="flex-shrink-0">
                      <ClipboardList className="h-8 w-8 rounded-full bg-orange-500 text-white p-1.5" />
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Lab report uploaded for <span className="font-medium text-gray-900">Patient #9012</span>
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        6 hours ago
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;