import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, User, FileText, AlertCircle } from "lucide-react";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { medicalRecordsAPI } from "../api/medicalRecords";

export default function MedicalRecordEntry() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    patient_id: "",
    visit_id: "",
    chief_complaint: "",
    history_of_present_illness: "",
    past_medical_history: "",
    physical_examination: "",
    diagnosis: "",
    treatment_plan: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // For demo purposes, using doctor_id = 1. In real app, get from auth context
      const doctorId = 1;
      
      const recordData = {
        ...formData,
        patient_id: parseInt(formData.patient_id),
        visit_id: formData.visit_id ? parseInt(formData.visit_id) : null
      };

      const result = await medicalRecordsAPI.createRecord(doctorId, recordData);
      
      setSuccess(true);
      setTimeout(() => {
        navigate(`/patient/history?patientId=${formData.patient_id}`);
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to create medical record');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FileText className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Medical Record Created Successfully
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>The medical record has been saved. Redirecting to patient history...</p>
                </div>
              </div>
            </div>
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
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Medical Record Entry</h1>
              <p className="text-gray-600 mt-1">Create a new patient medical record</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onRetry={() => setError(null)} />
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-sm rounded-lg p-6">
          {/* Patient Information */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Patient Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient ID *
                </label>
                <input
                  type="number"
                  name="patient_id"
                  value={formData.patient_id}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter patient ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visit ID (Optional)
                </label>
                <input
                  type="number"
                  name="visit_id"
                  value={formData.visit_id}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter visit ID if applicable"
                />
              </div>
            </div>
          </div>

          {/* Clinical Information */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Clinical Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chief Complaint
              </label>
              <textarea
                name="chief_complaint"
                value={formData.chief_complaint}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Patient's main concern or reason for visit"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                History of Present Illness
              </label>
              <textarea
                name="history_of_present_illness"
                value={formData.history_of_present_illness}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Detailed description of current symptoms, onset, duration, severity, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Past Medical History
              </label>
              <textarea
                name="past_medical_history"
                value={formData.past_medical_history}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Previous medical conditions, surgeries, hospitalizations, allergies"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Physical Examination
              </label>
              <textarea
                name="physical_examination"
                value={formData.physical_examination}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Vital signs, general appearance, system-specific findings"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diagnosis
              </label>
              <textarea
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Primary and secondary diagnoses with ICD codes if available"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Treatment Plan
              </label>
              <textarea
                name="treatment_plan"
                value={formData.treatment_plan}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Medications, procedures, follow-up appointments, patient education"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any additional observations, patient concerns, or special instructions"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.patient_id}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <Save className="h-5 w-5 mr-2" />
              )}
              {loading ? 'Saving...' : 'Save Medical Record'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}