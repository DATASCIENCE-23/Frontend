import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  FileText, 
  Calendar, 
  User, 
  Edit, 
  Trash2, 
  Plus,
  Pill,
  ClipboardList
} from "lucide-react";
import { format } from "date-fns";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { medicalRecordsAPI } from "../api/medicalRecords";

export default function MedicalRecordDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchRecord();
  }, [id]);

  const fetchRecord = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await medicalRecordsAPI.getRecord(parseInt(id));
      setRecord(data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to fetch medical record');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this medical record? This action cannot be undone.')) {
      return;
    }

    try {
      setActionLoading(true);
      await medicalRecordsAPI.deleteRecord(parseInt(id));
      navigate('/patient/history');
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to delete medical record');
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <ErrorMessage message={error} onRetry={fetchRecord} />
        </div>
      </Layout>
    );
  }

  if (!record) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Medical Record Not Found
            </h3>
            <p className="text-gray-600 mb-6">
              The medical record you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/patient/history"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Patient History
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Medical Record Details
                </h1>
                <p className="text-gray-600 mt-1">
                  Record #{record.record_id} - Patient #{record.patient_id}
                </p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onRetry={() => setError(null)} />
          </div>
        )}

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Record ID
                </label>
                <p className="text-sm text-gray-900">#{record.record_id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient ID
                </label>
                <p className="text-sm text-gray-900">#{record.patient_id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor ID
                </label>
                <p className="text-sm text-gray-900">#{record.doctor_id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Record Date
                </label>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900">
                    {format(new Date(record.record_date), 'PPP')}
                  </span>
                </div>
              </div>
            </div>
            {record.visit_id && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visit ID
                </label>
                <p className="text-sm text-gray-900">#{record.visit_id}</p>
              </div>
            )}
          </div>

          {/* Clinical Information */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Clinical Information
            </h2>
            <div className="space-y-4">
              {record.chief_complaint && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chief Complaint
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap">{record.chief_complaint}</p>
                </div>
              )}
              
              {record.history_of_present_illness && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    History of Present Illness
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap">{record.history_of_present_illness}</p>
                </div>
              )}
              
              {record.past_medical_history && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Past Medical History
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap">{record.past_medical_history}</p>
                </div>
              )}
              
              {record.physical_examination && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Physical Examination
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap">{record.physical_examination}</p>
                </div>
              )}
              
              {record.diagnosis && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diagnosis
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap">{record.diagnosis}</p>
                </div>
              )}
              
              {record.treatment_plan && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Treatment Plan
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap">{record.treatment_plan}</p>
                </div>
              )}
              
              {record.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap">{record.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Actions
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/patient/history?patientId=${record.patient_id}`}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <User className="h-4 w-4 mr-2" />
                View Patient History
              </Link>
              
              <Link
                to={`/doctor/prescription?recordId=${record.record_id}&patientId=${record.patient_id}`}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Pill className="h-4 w-4 mr-2" />
                Create Prescription
              </Link>
              
              <Link
                to={`/reports/${record.record_id}`}
                className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <ClipboardList className="h-4 w-4 mr-2" />
                View Reports
              </Link>
              
              <button
                onClick={handleDelete}
                disabled={actionLoading}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {actionLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                Delete Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}