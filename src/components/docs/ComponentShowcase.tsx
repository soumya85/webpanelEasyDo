import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Code, Eye, FileText } from "lucide-react";

interface ComponentShowcaseProps {
  title: string;
  description: string;
  component: React.ReactNode;
  code: string;
  props?: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
    required?: boolean;
  }>;
  variants?: string[];
  typescript?: {
    filePath: string;
    startLine: number;
    endLine?: number;
    importPath?: string;
  };
}

export function ComponentShowcase({
  title,
  description,
  component,
  code,
  props = [],
  variants = [],
  typescript,
}: ComponentShowcaseProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl mb-2">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {variants.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {variants.map((variant) => (
                <Badge key={variant} variant="outline" className="text-xs">
                  {variant}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="preview" className="w-full">
          <TabsList
            className={`grid w-full ${typescript ? "grid-cols-4" : "grid-cols-3"}`}
          >
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Code
            </TabsTrigger>
            {props.length > 0 && <TabsTrigger value="props">Props</TabsTrigger>}
            {typescript && (
              <TabsTrigger
                value="typescript"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                TypeScript
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="preview" className="mt-6">
            <div className="border rounded-lg p-8 bg-background min-h-[200px] flex items-center justify-center">
              <div className="flex flex-wrap gap-4 items-center justify-center">
                {component}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code" className="mt-6">
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="absolute top-3 right-3 z-10"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Copied!" : "Copy"}
              </Button>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{code}</code>
              </pre>
            </div>
          </TabsContent>

          {props.length > 0 && (
            <TabsContent value="props" className="mt-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-semibold">Prop</th>
                      <th className="text-left p-2 font-semibold">Type</th>
                      <th className="text-left p-2 font-semibold">Default</th>
                      <th className="text-left p-2 font-semibold">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.map((prop) => (
                      <tr key={prop.name} className="border-b">
                        <td className="p-2 font-mono text-sm">
                          {prop.name}
                          {prop.required && (
                            <span className="text-destructive ml-1">*</span>
                          )}
                        </td>
                        <td className="p-2 font-mono text-sm text-muted-foreground">
                          {prop.type}
                        </td>
                        <td className="p-2 font-mono text-sm text-muted-foreground">
                          {prop.default || "-"}
                        </td>
                        <td className="p-2 text-sm">{prop.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          )}

          {typescript && (
            <TabsContent value="typescript" className="mt-6">
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-3 text-sm">
                    File Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground font-medium">
                        File Path:
                      </span>
                      <code className="bg-background px-2 py-1 rounded text-xs">
                        {typescript.filePath}
                      </code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground font-medium">
                        Lines:
                      </span>
                      <code className="bg-background px-2 py-1 rounded text-xs">
                        {typescript.startLine}
                        {typescript.endLine ? `-${typescript.endLine}` : ""}
                      </code>
                    </div>
                    {typescript.importPath && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground font-medium">
                          Import:
                        </span>
                        <code className="bg-background px-2 py-1 rounded text-xs">
                          {typescript.importPath}
                        </code>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-3 text-sm">Quick Import</h4>
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => {
                        const importStatement =
                          typescript.importPath ||
                          `import { ${title.replace(/\s+/g, "")} } from "${typescript.filePath.replace(/^src\//, "@/")}";`;
                        navigator.clipboard.writeText(importStatement);
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <pre className="bg-background p-3 rounded text-xs overflow-x-auto">
                      <code>
                        {typescript.importPath ||
                          `import { ${title.replace(/\s+/g, "")} } from "${typescript.filePath.replace(/^src\//, "@/")}";`}
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-3 text-sm">
                    Development Info
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground font-medium block mb-1">
                        Component Type:
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {typescript.filePath.includes("/ui/")
                          ? "UI Component"
                          : typescript.filePath.includes("/layout/")
                            ? "Layout Component"
                            : typescript.filePath.includes("/docs/")
                              ? "Documentation Component"
                              : "Business Component"}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-medium block mb-1">
                        Framework:
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        React + TypeScript
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
