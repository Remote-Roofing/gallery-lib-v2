import { Switch } from "@/components/ui/switch"
import { useState } from "react";

export default function ToggleSwitchMagnify({ 
    toggleHandler
} : { 
    toggleHandler: () => void;
}) {
    
    const [checked, setChecked] = useState(false);

    return (
        <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" onClick={toggleHandler} onCheckedChange={() => setChecked(!checked)}>
                <span className={"text-sm font-medium text-slate-500"}>{checked ? null : 'Off'}</span>
            </Switch>
        </div>
    )
}