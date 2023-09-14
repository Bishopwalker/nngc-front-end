import * as React from "react";
import {Field} from 'react-final-form'

type DisplayErrorProps = {
    delay: number,
    active: boolean,
    dirty: boolean,
    error: boolean,
    touched: boolean,
    children: React.ReactNode
}

const DisplayError = ({ delay, active, dirty, error, touched, children }:DisplayErrorProps) => {
    const [show, setShow] = React.useState(false)
    React.useEffect(
        () => {
            let timeout: string | number | NodeJS.Timeout | undefined
            if (active && error && dirty) {
                console.info('setting timeout')
                timeout = setTimeout(() => setShow(true), delay)
            }
            return () => {
                console.info('clearing timeout')
                clearTimeout(timeout)
            }
        },
        [delay, error, active, dirty]
    )

    return error && ((touched && !active) || (touched && !show && active) || show)
    // @ts-ignore
        ? children(error)
        : null
}
type ErrorWithDelayProps = {
    delay: number,
    name: string,
    children: React.ReactNode
}
const ErrorWithDelay = ({delay,name,children}:ErrorWithDelayProps) => {

    return (
        <Field
            name={name}
            subscription={{ active: true, error: true, dirty: true, touched: true }}
        >
            {({ meta: { active, dirty, error, touched } }) => (
                <DisplayError
                    delay={delay}
                    active={active as boolean}
                    dirty={dirty as boolean}
                    error={error}
                    touched={touched as boolean}
                    children={children}
                />
            )}
        </Field>
    )
}
export default ErrorWithDelay