export interface ReturnStatus {
    success: boolean,
    message: string
}

export function send_message (msg: string): ReturnStatus {
    return {success: true, message: msg}
}

export function send_error (msg: string): ReturnStatus {
    return {success: false, message: msg}
}