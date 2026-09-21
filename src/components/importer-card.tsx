"use client";

import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Text } from "./ui/text";

export function ImporterCard() {
  const runImport = useAction(api.importer.importStore);
  const [importUrl, setImportUrl] = useState("https://www.instagram.com/styleinlagosss");
  const [importNote, setImportNote] = useState("");
  const [importing, setImporting] = useState(false);

  async function submitImport() {
    setImporting(true);
    setImportNote("");
    try {
      const result = await runImport({ url: importUrl.trim() });
      setImportNote(result.note);
    } catch (err) {
      setImportNote(err instanceof Error ? err.message : "Import failed");
    } finally {
      setImporting(false);
    }
  }

  return (
    <Card variant="panel" className="mt-6">
      <CardHeader>
        <CardTitle>Vendor importer</CardTitle>
        <CardDescription>Paste a store URL. Firecrawl crawls it into draft Listings for review.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-1">
          <Label htmlFor="importUrl">Store URL</Label>
          <Input
            id="importUrl"
            name="importUrl"
            autoComplete="url"
            value={importUrl}
            onChange={(e) => setImportUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
        {importNote !== "" && (
          <Text className="mt-3" role="status">
            {importNote}
          </Text>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" loading={importing} onClick={() => void submitImport()}>
          Import store
        </Button>
      </CardFooter>
    </Card>
  );
}
