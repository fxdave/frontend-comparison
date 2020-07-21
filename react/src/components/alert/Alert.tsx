import React, { useReducer, createContext, useContext, useEffect } from "react";
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'

interface IAlert {
    message: string
    severity: "success" | "info" | "warning" | "error" | undefined
    timeout?: number
    id?: number
}

interface IAlertContext {
    alerts: IAlert[],
    addAlert: (alert: IAlert) => void
}

const alertContext = createContext<IAlertContext | null>(null);

export const useAlert = () => {
    return useContext(alertContext);
};

function alertReducer(alerts: IAlert[], action: { type: string, payload: any }): IAlert[] {
    if (action.type === 'add') {
        return [...alerts, action.payload]
    } else if (action.type === 'clear') {
        let toDelete = alerts.filter(alert => alert.id == action.payload);
        clearTimeout(toDelete[0].timeout);
        return alerts.filter(alert => alert.id != action.payload)
    }
    return alerts
}

let alertId = 0;
export const AlertProvider = ({ children }: { children: any }) => {

    const [alerts, dispatchAlert] = useReducer(alertReducer, []);
    
    function addAlert(alert: IAlert) {
        alert.id = ++alertId;
        dispatchAlert({
            type: 'add',
            payload: {
                ...alert,
                timeout: setTimeout(() => {
                        dispatchAlert({
                            type: 'clear',
                            payload: alert.id
                        });
                    },
                    alert.timeout && alert.timeout * 1000 || 3000
                )
            },
        })
    }


    return <>
        {alerts.map((alert, index) => <Alert
            severity={alert?.severity}
            key={index}
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => dispatchAlert({ type: 'clear', payload: alert.id })}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }
        >{alert?.message}</Alert>)}
        <alertContext.Provider value={{ addAlert, alerts }}>
            {children}
        </alertContext.Provider>
    </>
}