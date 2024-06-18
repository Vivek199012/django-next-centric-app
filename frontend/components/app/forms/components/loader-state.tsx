import { LoaderCircle } from "lucide-react";

export const LoaderState = () => {
    return (
        <div className="flex gap-2">
            <LoaderCircle size="18" className="animate-spin" />
            Loading
        </div>
    );
};
