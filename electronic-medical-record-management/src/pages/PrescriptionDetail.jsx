import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Pill, 
  Calendar, 
  User, 
  FileText, 
  Edit, 
  Trash2, 
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { format } from "date-fns";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { prescriptionsAPI } from "../api/prescriptions";

export default function PrescriptionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchPrescription();
  }, [id]);

  const fetchPrescription = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await prescriptionsAPI.getPrescription(parseInt(id));
      setPrescription(data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to fetch prescription');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this prescription?')) {
      return;
    }

    try {
      setActionLoading(true);
      await prescriptionsAPI.cancelPrescription(parseInt(id));
      await fetchPrescription(); // Refresh data
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to cancel prescription');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this prescription? This action cannot be undone.')) {
      return;
    }

    try {
      setActionLoading(true);
      await prescriptionsAPI.deletePrescription(parseInt(id));
      navigate('/patient/history');
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to delete prescription');
      setActionLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
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
          <ErrorMessage message={error} onRetry={fetchPrescription} />
        </div>
      </Layout>
    );
  }

  if (!prescription) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center py-12">
            <Pill className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Prescription Not Found
            </h3>
            <p className="text-gray-600 mb-6">
              The prescription you're looking for doesn't exist or has been removed.
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
              <Pill className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Prescription Details
                </h1>
                <p className="text-gray-600 mt-1">
                  Prescription #{prescription.prescription_id}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(prescription.status)}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(prescription.status)}`}>
                {prescription.status?.charAt(0).toUpperCase() + prescription.status?.slice(1)}
              </span>
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
              <FileText className="h-5 w-5 mr-2" />
              Prescription Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient ID
                </label>
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900">#{prescription.patient_id}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medical Record ID
                </label>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-gray-400 mr-2" />
                  <Link 
                    to={`/medical-record/${prescription.record_id}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    #{prescription.record_id}
                  </Link>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor ID
                </label>
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900">#{prescription.doctor_id}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prescription Date
                </label>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900">
                    {format(new Date(prescription.prescription_date), 'PPP')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Medications */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Pill className="h-5 w-5 mr-2" />
              Medications ({prescription.medications?.length || 0})
            </h2>
            {prescription.medications && prescription.medications.length > 0 ? (
              <div className="space-y-4">
                {prescription.medications.map((medication, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="md:col-span-2 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Medication
                        </label>
                        <p className="text-sm font-semibold text-gray-900">
                          {medication.medication_name}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dosage
                        </label>
                        <p className="text-sm text-gray-900">{medication.dosage}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Frequency
                        </label>
                        <p className="text-sm text-gray-900">{medication.frequency}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration
                        </label>
                        <p className="text-sm text-gray-900">
                          {medication.duration || 'Not specified'}
                        </p>
                      </div>
                    </div>
                    {medication.instructions && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Special Instructions
                        </label>
                        <p className="text-sm text-gray-900">{medication.instructions}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No medications listed for this prescription.
              </p>
            )}
          </div>

          {/* Additional Notes */}
          {prescription.notes && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Additional Notes
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap">{prescription.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Actions
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/patient/history?patientId=${prescription.patient_id}`}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <User className="h-4 w-4 mr-2" />
                View Patient History
              </Link>
              
              {prescription.status === 'active' && (
                <>
                  <button
                    onClick={handleCancel}
                    disabled={actionLoading}
                    className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 transition-colors"
                  >
                    {actionLoading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-2" />
                    )}
                    Cancel Prescription
                  </button>
                </>
              )}
              
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
                Delete Prescription
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}