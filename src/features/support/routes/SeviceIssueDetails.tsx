import { FormInput, FormSelect, FormTextarea } from "@/components/molecules/ReactHookForm";
import { FormCalendar } from "@/components/molecules/ReactHookForm/Calendar/Calendar";
import { FormField } from "@/components/molecules/ReactHookForm/FormField/FormField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import { useState, useRef } from "react";

const ServiceIssueDetails = () => {
  const methods = useForm({
    defaultValues: {
      name: "",
      website: "",
      taxId: "",
      businessType: "",
      accountType: "",
      defaultCurrency: "",
      subIndustry: "",
      industryDescription: "",
    },
  });

  const [attachments, setAttachments] = useState([
    { id: 1, label: "Photo 1", type: "placeholder" },
    { id: 2, label: "Photo 2", type: "placeholder" },
    { id: 3, label: "Video", type: "placeholder" },
  ]);

  const fileInputRef = useRef(null);

  const handleAddAttachment = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    
    files.forEach((file) => {
      // Validate file type (images and videos)
      const isValidFile = file.type.startsWith('image/') || file.type.startsWith('video/');
      
      if (!isValidFile) {
        alert('Please select only image or video files.');
        return;
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      
      // Add to attachments
      const newAttachment = {
        id: Date.now() + Math.random(), // Simple unique ID
        label: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        file: file,
        previewUrl: previewUrl,
        size: file.size
      };

      setAttachments(prev => [...prev.filter(att => att.type !== 'placeholder'), newAttachment]);
    });

    // Reset input
    event.target.value = '';
  };

  const handleRemoveAttachment = (id) => {
    setAttachments(prev => {
      const attachment = prev.find(att => att.id === id);
      // Clean up object URL to prevent memory leaks
      if (attachment?.previewUrl) {
        URL.revokeObjectURL(attachment.previewUrl);
      }
      return prev.filter(att => att.id !== id);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex justify-start">
      <div className="w-full lg:w-3/5">
        <Card>
          <CardHeader>
            <CardTitle>Issue Details</CardTitle>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <form className="flex flex-col gap-1">
                <div className="flex w-full justify-between gap-2">
                  <FormSelect
                    name="issueCategory1"
                    label="Issue Category"
                    className="text-gray-700 w-1/2"
                    placeholder="Select Category"
                    options={[
                      { value: "Low", label: "Low" },
                      { value: "High", label: "High" },
                    ]}
                    disabled={false}
                  />
                  <FormSelect
                    name="Problem Type"
                    label="Problem Type"
                    className="text-gray-700 w-1/2"
                    placeholder="Select ProblemType"
                    options={[
                      { value: "Low", label: "Low" },
                      { value: "High", label: "High" },
                    ]}
                    disabled={false}
                  />
                </div>

                <div className="flex w-full">
                  <FormTextarea
                    name="Problem Description"
                    label="Problem Description"
                    className="text-gray-700 w-full"
                    placeholder="Write a problem description"
                  />
                </div>

                <div className="flex w-full justify-between gap-2">
                  <FormInput
                    name="Asset Serial Number"
                    label="Asset Serial Number"
                    className="text-gray-700 w-1/2"
                    placeholder="Asset Serial Number"
                  />
                  <FormField
                    name="Installation Date"
                    label="Installation Date"
                    className="text-gray-700 w-1/2"
                  >
                    {({ field }) => (
                      <FormCalendar value={field.value} onChange={field.onChange} />
                    )}
                  </FormField>
                </div>

                <div className="flex w-full">
                  <FormTextarea
                    name="Initial Diagnosis notes"
                    label="Initial Diagnosis notes"
                    className="text-gray-700 w-full"
                    placeholder="Write a diagnosis note"
                  />
                </div>

                <div className="p-2 w-full max-w-3xl">
                  <div className="mb-2 font-medium text-gray-700">Attachments</div>
                  
                  {/* Display attachments */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    {attachments.map((att) => (
                      <div key={att.id} className="relative group">
                        {att.type === 'placeholder' ? (
                          <div className="w-24 h-24 flex items-center justify-center bg-gray-700 text-white rounded-md text-sm font-medium">
                            {att.label}
                          </div>
                        ) : (
                          <div className="w-24 h-24 relative bg-gray-100 rounded-md overflow-hidden border">
                            {att.type === 'image' ? (
                              <img
                                src={att.previewUrl}
                                alt={att.label}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
                                <div className="text-xs text-gray-600 mb-1">📹</div>
                                <div className="text-xs text-gray-600 text-center px-1 leading-tight">
                                  {att.label.length > 10 ? att.label.substring(0, 10) + '...' : att.label}
                                </div>
                              </div>
                            )}
                            
                            {/* Remove button */}
                            <button
                              type="button"
                              onClick={() => handleRemoveAttachment(att.id)}
                              className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                            
                            {/* File info tooltip */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="truncate">{att.label}</div>
                              <div>{formatFileSize(att.size)}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add attachment button and hidden file input */}
                  <button
                    type="button"
                    onClick={handleAddAttachment}
                    className="flex items-center gap-2 text-sm text-gray-700 border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-100 transition"
                  >
                    <span className="text-lg font-medium">＋</span> Add Attachment
                  </button>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceIssueDetails;