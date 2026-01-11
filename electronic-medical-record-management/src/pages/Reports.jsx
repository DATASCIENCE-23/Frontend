import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { 
  Upload, 
  FileText, 
  Calendar, 
  Eye, 
  Download,
  Plus,
  Search
} from "lucide-react";
import { format } from "date-fns";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { reportsAPI } from "../api/reports";

export default function Reports() {
  const { recordId } = useParams();
  const [searchParams] = useSearchParams();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [searchRecordId, setSearchRecordId] = useState(recordId || '');

  const [uploadForm, setUploadForm] = useState({
    record_id: recordId || '',
    report_type: '',
    findings: '',
    report_date: new Date().toISOString().split('T')[0],
    file_url: ''
  });

  useEffect(() => {
    if (recordId) {
      fetchReports(recordId);
    }
  }, [recordId]);

  const fetchReports = async (id) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await reportsAPI.getReportsForVisit(parseInt(id));
      setReports(data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchRecordId) {
      fetchReports(searchRecordId);
    }
  };

  const handleUploadFormChange = (e) => {
    const { name, value } = e.target;
    setUploadForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setUploadLoading(true);
    setError(null);

    try {
      const reportData = {
        ...uploadForm,
        record_id: parseInt(uploadForm.record_id)
      };

      await reportsAPI.createReport(reportData);
      
      // Refresh reports list
      await fetchReports(uploadForm.record_id);
      
      // Reset form
      setUploadForm({
        record_id: recordId || '',
        report_type: '',
        findings: '',
        report_date: new Date().toISOString().split('T')[0],
        file_url: ''
      });
      setShowUploadForm(false);
      
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to create report');
    } finally {
      setUploadLoading(false);
    }
  };

  const reportTypes = [
    'Lab Results',
    'Radiology Report',
    'Pathology Report',
    'Consultation Report',
    'Discharge Summary',
    'Progress Note',
    'Surgical Report',
    'Other'
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Medical Reports</h1>
                <p className="text-gray-600 mt-1">Upload and view medical reports and documents</p>
              </div>
            </div>
            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Upload Report
            </button>
          </div>
        </div>

        {/* Search Form */}
        {!recordId && (
          <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Record ID
                </label>
                <input
                  type="number"
                  value={searchRecordId}
                  onChange={(e) => setSearchRecordId(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter medical record ID to search reports"
                  required
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search Reports
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Upload Form */}
        {showUploadForm && (
          <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Upload New Report
            </h2>
            
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical Record ID *
                  </label>
                  <input
                    type="number"
                    name="record_id"
                    value={uploadForm.record_id}
                    onChange={handleUploadFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                    placeholder="Enter medical record ID"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Type *
                  </label>
                  <select
                    name="report_type"
                    value={uploadForm.report_type}
                    onChange={handleUploadFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Select report type</option>
                    {reportTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Date *
                  </label>
                  <input
                    type="date"
                    name="report_date"
                    value={uploadForm.report_date}
                    onChange={handleUploadFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="file_url"
                    value={uploadForm.file_url}
                    onChange={handleUploadFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="https://example.com/report.pdf"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Findings & Results *
                </label>
                <textarea
                  name="findings"
                  value={uploadForm.findings}
                  onChange={handleUploadFormChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter detailed findings, results, and observations"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadLoading}
                  className="flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {uploadLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <Upload className="h-5 w-5 mr-2" />
                  )}
                  {uploadLoading ? 'Uploading...' : 'Upload Report'}
                </button>
              </div>
            </form>
          </div>
        )}

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
              onRetry={() => fetchReports(recordId || searchRecordId)} 
            />
          </div>
        )}

        {/* Reports List */}
        {!loading && !error && (recordId || searchRecordId) && (
          <div className="bg-white shadow-sm rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Reports for Medical Record #{recordId || searchRecordId}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {reports.length} report(s) found
              </p>
            </div>

            {reports.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Reports Found
                </h3>
                <p className="text-gray-600 mb-6">
                  No reports have been uploaded for this medical record yet.
                </p>
                <button
                  onClick={() => setShowUploadForm(true)}
                  className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Upload First Report
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {reports.map((report) => (
                  <div key={report.report_id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className="text-lg font-medium text-gray-900">
                            {report.report_type}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            {format(new Date(report.report_date), 'PPP')}
                          </div>
                          <div className="text-sm text-gray-600">
                            Report ID: #{report.report_id}
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Findings:</h4>
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {report.findings}
                          </p>
                        </div>
                        
                        {report.file_url && (
                          <div className="flex items-center text-sm text-blue-600">
                            <FileText className="h-4 w-4 mr-1" />
                            <a 
                              href={report.file_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-blue-800"
                            >
                              View attached file
                            </a>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <button className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </button>
                        {report.file_url && (
                          <a
                            href={report.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {!loading && !error && !recordId && !searchRecordId && (
          <div className="bg-white shadow-sm rounded-lg p-12 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Medical Reports Management
            </h3>
            <p className="text-gray-600 mb-6">
              Search for reports by medical record ID or upload new reports and documents.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}