import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, User, Calendar, FileText, Eye, Plus } from "lucide-react";
import { format } from "date-fns";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { medicalRecordsAPI } from "../api/medicalRecords";

export default function PatientHistory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [patientId, setPatientId] = useState(searchParams.get('patientId') || '');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPatientHistory = async (id) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await medicalRecordsAPI.getPatientHistory(parseInt(id));
      setRecords(data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to fetch patient history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchPatientHistory(patientId);
    }
  }, [patientId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (patientId) {
      setSearchParams({ patientId });
      fetchPatientHistory(patientId);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Patient Medical History</h1>
                <p className="text-gray-600 mt-1">View comprehensive patient medical records</p>
              </div>
            </div>
            <Link
              to="/doctor/record"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Record
            </Link>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient ID
              </label>
              <input
                type="number"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter patient ID to search"
                required
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-6">
            <ErrorMessage 
              message={error} 
              onRetry={() => fetchPatientHistory(patientId)} 
            />
          </div>
        )}

        {/* Results */}
        {!loading && !error && patientId && (
          <div className="bg-white shadow-sm rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Medical Records for Patient #{patientId}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {records.length} record(s) found
              </p>
            </div>

            {records.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Medical Records Found
                </h3>
                <p className="text-gray-600 mb-6">
                  No medical records exist for this patient ID.
                </p>
                <Link
                  to="/doctor/record"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create First Record
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {records.map((record) => (
                  <div key={record.record_id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            {format(new Date(record.record_date), 'PPP')}
                          </div>
                          <div className="text-sm text-gray-600">
                            Record ID: #{record.record_id}
                          </div>
                          <div className="text-sm text-gray-600">
                            Doctor ID: #{record.doctor_id}
                          </div>
                          {record.visit_id && (
                            <div className="text-sm text-gray-600">
                              Visit ID: #{record.visit_id}
                            </div>
                          )}
                        </div>
                        
                        {record.chief_complaint && (
                          <div className="mb-2">
                            <span className="text-sm font-medium text-gray-700">Chief Complaint: </span>
                            <span className="text-sm text-gray-600">{record.chief_complaint}</span>
                          </div>
                        )}
                        
                        {record.diagnosis && (
                          <div className="mb-2">
                            <span className="text-sm font-medium text-gray-700">Diagnosis: </span>
                            <span className="text-sm text-gray-600">{record.diagnosis}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link
                          to={`/medical-record/${record.record_id}`}
                          className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Link>
                        <Link
                          to={`/doctor/prescription?recordId=${record.record_id}&patientId=${record.patient_id}`}
                          className="flex items-center px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Prescribe
                        </Link>
                        <Link
                          to={`/reports/${record.record_id}`}
                          className="flex items-center px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Reports
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {!loading && !error && !patientId && (
          <div className="bg-white shadow-sm rounded-lg p-12 text-center">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Search Patient Medical History
            </h3>
            <p className="text-gray-600 mb-6">
              Enter a patient ID above to view their complete medical history and records.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}