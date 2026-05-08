import type { SecurityStrength, TwoFactorMethod } from './types'

export const getSecurityDisplay = (strength: SecurityStrength) => {
    switch (strength) {
        case 'very-secure':
            return {
                text: 'Very secure',
                className: 'text-success',
                showIcon: true,
            }
        case 'strong':
            return {
                text: 'Strong',
                className: 'text-success',
                showIcon: true,
            }
        case 'medium':
            return {
                text: 'Medium',
                className: 'text-warning',
                showIcon: false,
            }
        case 'weak':
            return {
                text: 'Weak',
                className: 'text-error',
                showIcon: false,
            }
        default:
            return {
                text: 'Unknown',
                className: 'text-gray-500',
                showIcon: false,
            }
    }
}

export const getMethodDisplay = (method?: TwoFactorMethod) => {
    switch (method) {
        case 'sms':
            return 'SMS'
        case 'app':
            return 'Authenticator App'
        case 'email':
            return 'Email'
        default:
            return 'Two-step verification'
    }
}
