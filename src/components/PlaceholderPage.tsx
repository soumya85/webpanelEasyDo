import { PageLayout } from "@/components/layout/PageLayout";

interface PlaceholderPageProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function PlaceholderPage({
  title,
  description,
  icon,
}: PlaceholderPageProps) {
  return (
    <PageLayout>
      <div className="p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          {icon && (
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                {icon}
              </div>
            </div>
          )}

          <h1 className="text-2xl font-bold text-azure-24 mb-4">{title}</h1>

          {description && (
            <p className="text-gray-600 max-w-md mx-auto">{description}</p>
          )}

          <div className="mt-8 text-sm text-gray-500">
            This page is under development. Check back soon for updates!
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
