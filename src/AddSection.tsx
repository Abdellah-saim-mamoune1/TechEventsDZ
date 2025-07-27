import { useState } from "react";
import { motion } from "framer-motion";
import { AddNewSection } from "./APIs";

export function AddSection() {
  const [sectionName, setSectionName] = useState("");
  const [error, setError] = useState("");
  const [Result, setResult] = useState<boolean|null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setSectionName(value);
      setError("");
    } else {
      setError("Section name must be 20 characters or less.");
    }
  };

  const  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sectionName.trim().length === 0) {
      setError("Section name is required.");
      return;
    }
    const result= await AddNewSection(sectionName);
    if(result===false){
     setResult(false);
    }

    else{
        setResult(true);
    }

    setIsLoading(false);
    console.log("Submitted section:", sectionName);
  };

  return (
    <div className="flex mt-30 items-center justify-center p-3 flex-1">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">Add New Section</h2>
          <p className={`${Result===true?"text-green-700":"text-red-700"}`}>{Result!==null&&(Result?"Section was added successfully":"Failed to add section")}</p>
        </div>

        <motion.form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="section" className="block text-gray-700 mb-1">
              Section Name
            </label>
            <input
              type="text"
              id="section"
              value={sectionName}
              onChange={handleChange}
              maxLength={20}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter section name"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center gap-2"
            disabled={isLoading}
            whileHover={!isLoading ? { scale: 1.05 } : {}}
            whileTap={!isLoading ? { scale: 0.95 } : {}}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Add Section"
            )}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
