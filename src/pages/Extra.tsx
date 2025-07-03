import { ReactiveMultilingualText } from "@/components/ReactiveMultilingualText";

const Extra = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 px-6 pt-6">
        <ReactiveMultilingualText
          as="h1"
          className="text-2xl font-bold text-[#283C50]"
          translationKey="extra"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <ReactiveMultilingualText
            as="h2"
            className="text-lg font-semibold text-gray-700 mb-4"
            translationKey="welcomeToExtra"
          />
          <ReactiveMultilingualText
            as="p"
            className="text-gray-600"
            translationKey="extraPageDescription"
          />
        </div>
      </div>
    </div>
  );
};

export default Extra;
