import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Building, Check } from "lucide-react";

interface Company {
  id: string;
  name: string;
  type: "primary" | "secondary";
}

const companies: Company[] = [
  { id: "1", name: "EasyDo Corp", type: "primary" },
  { id: "2", name: "EasyDo Tech", type: "secondary" },
  { id: "3", name: "EasyDo Solutions", type: "secondary" },
  { id: "4", name: "EasyDo Services", type: "secondary" },
];

interface CompanyChangerProps {
  isExpanded: boolean;
}

export function CompanyChanger({ isExpanded }: CompanyChangerProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company>(companies[0]);

  const handleCompanyChange = (company: Company) => {
    setSelectedCompany(company);
  };

  if (!isExpanded) {
    // Collapsed view - show just the icon
    return (
      <div className="flex items-center justify-center px-4 py-3 border-b border-gray-400">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 hover:bg-gray-100"
            >
              <Building className="h-5 w-5 text-azure-24" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="right" className="w-56">
            <div className="px-2 py-1.5 text-sm font-semibold text-gray-900">
              Switch Company
            </div>
            <DropdownMenuSeparator />
            {companies.map((company) => (
              <DropdownMenuItem
                key={company.id}
                onClick={() => handleCompanyChange(company)}
                className={cn(
                  "flex items-center justify-between cursor-pointer",
                  selectedCompany.id === company.id && "bg-gray-100"
                )}
              >
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span>{company.name}</span>
                </div>
                {selectedCompany.id === company.id && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // Expanded view - show full company selector
  return (
    <div className="px-4 py-3 border-b border-gray-400">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between h-auto p-3 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Building className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold text-azure-24">
                  {selectedCompany.name}
                </span>
                <span className="text-xs text-gray-500 capitalize">
                  {selectedCompany.type} Company
                </span>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <div className="px-2 py-1.5 text-sm font-semibold text-gray-900">
            Switch Company
          </div>
          <DropdownMenuSeparator />
          {companies.map((company) => (
            <DropdownMenuItem
              key={company.id}
              onClick={() => handleCompanyChange(company)}
              className={cn(
                "flex items-center justify-between cursor-pointer",
                selectedCompany.id === company.id && "bg-gray-100"
              )}
            >
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-sm">{company.name}</span>
                  <span className="text-xs text-gray-500 capitalize">
                    {company.type}
                  </span>
                </div>
              </div>
              {selectedCompany.id === company.id && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
