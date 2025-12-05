import { ToolOutput } from '../../ai-elements/tool';
import type { ToolUIPart } from 'ai';
import { LinkIcon, CheckCircleIcon, XCircleIcon, LoaderIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface LinkDataResult {
    url: string;
    status: 'success' | 'error' | 'pending';
    data?: unknown;
    error?: string;
    contentType?: string;
    size?: number;
}

export interface LinkDataReaderData {
    links: LinkDataResult[];
    totalLinks: number;
    successful: number;
    failed: number;
    pending: number;
}

function LinkDataReaderOutput({
    output,
    errorText,
}: {
    output: ToolUIPart['output'];
    errorText: ToolUIPart['errorText'];
}) {
    if (errorText) {
        return <ToolOutput output={output} errorText={errorText} />;
    }

    if (!output) {
        return <ToolOutput output={output} errorText={errorText} />;
    }

    let parsedOutput: unknown = output;
    if (typeof output === 'string') {
        try {
            parsedOutput = JSON.parse(output);
        } catch {
            return <ToolOutput output={output} errorText={errorText} />;
        }
    }

    if (
        parsedOutput &&
        typeof parsedOutput === 'object' &&
        !Array.isArray(parsedOutput) &&
        'links' in parsedOutput &&
        Array.isArray(parsedOutput.links)
    ) {
        try {
            const data = parsedOutput as LinkDataReaderData;
            const { links, totalLinks, successful, failed, pending } = data;

            return (
                <div className="min-w-0 space-y-4 p-4">
                    {/* Summary Header */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                            <div className="flex size-9 items-center justify-center rounded-lg border-2 border-foreground/10 shrink-0">
                                <LinkIcon className="size-4.5 text-foreground" />
                            </div>
                            <div className="flex flex-col gap-1 min-w-0 flex-1">
                                <h3 className="text-base font-semibold text-foreground">
                                    Link Data Reader
                                </h3>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-sm text-muted-foreground">
                                        {totalLinks} link{totalLinks !== 1 ? 's' : ''} processed
                                    </span>
                                    {successful > 0 && (
                                        <span className="text-sm text-emerald-600 font-medium">
                                            {successful} successful
                                        </span>
                                    )}
                                    {failed > 0 && (
                                        <span className="text-sm text-destructive font-medium">
                                            {failed} failed
                                        </span>
                                    )}
                                    {pending > 0 && (
                                        <span className="text-sm text-muted-foreground font-medium">
                                            {pending} pending
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Links List */}
                    <div className="space-y-2">
                        {links.map((link, index) => (
                            <div
                                key={index}
                                className={cn(
                                    'rounded-lg border p-4 transition-colors',
                                    link.status === 'success' &&
                                    'border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20',
                                    link.status === 'error' &&
                                    'border-destructive/20 bg-destructive/5',
                                    link.status === 'pending' &&
                                    'border-border bg-muted/30',
                                )}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="shrink-0 mt-0.5">
                                        {link.status === 'success' && (
                                            <CheckCircleIcon className="size-4 text-emerald-600" />
                                        )}
                                        {link.status === 'error' && (
                                            <XCircleIcon className="size-4 text-destructive" />
                                        )}
                                        {link.status === 'pending' && (
                                            <LoaderIcon className="size-4 text-muted-foreground animate-spin" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-2">
                                        <div>
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-medium text-foreground hover:underline break-all"
                                            >
                                                {link.url}
                                            </a>
                                        </div>
                                        {link.status === 'success' && (
                                            <div className="space-y-1">
                                                {link.contentType && (
                                                    <div className="text-xs text-muted-foreground">
                                                        Type: {link.contentType}
                                                    </div>
                                                )}
                                                {link.size !== undefined && (
                                                    <div className="text-xs text-muted-foreground">
                                                        Size: {(link.size / 1024).toFixed(2)} KB
                                                    </div>
                                                )}
                                                {link.data !== undefined && (
                                                    <div className="mt-2 rounded border bg-background p-2">
                                                        <pre className="text-xs font-mono overflow-x-auto">
                                                            {typeof link.data === 'string'
                                                                ? link.data
                                                                : typeof link.data === 'object' && link.data !== null
                                                                    ? JSON.stringify(link.data, null, 2)
                                                                    : String(link.data ?? '')}
                                                        </pre>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        {link.status === 'error' && link.error && (
                                            <div className="text-sm text-destructive">{link.error}</div>
                                        )}
                                        {link.status === 'pending' && (
                                            <div className="text-sm text-muted-foreground">
                                                Processing...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } catch (error) {
            console.error('[LinkDataReaderOutput] Error:', error);
            return <ToolOutput output={output} errorText={errorText} />;
        }
    }

    return <ToolOutput output={output} errorText={errorText} />;
}

export { LinkDataReaderOutput };

