'use client'

import Checkbox from '@/components/ui/Checkbox'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import type { ViewPreferences as ViewPreferencesType } from '../types'

type Props = {
    viewPreferences: ViewPreferencesType
}

const ViewPreferences = ({ viewPreferences }: Props) => {
    const appendQueryParams = useAppendQueryParams()

    return (
        <div className="space-y-2">
            <div className="heading-text font-semibold">View Preferences</div>
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={viewPreferences.applyProbabilityWeighting}
                        onChange={(checked) =>
                            appendQueryParams({
                                probabilityWeighting: checked ? 'true' : null,
                            })
                        }
                    >
                        <span>Apply Probability Weighting</span>
                    </Checkbox>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={viewPreferences.highlightStalledDeals}
                        onChange={(checked) =>
                            appendQueryParams({
                                highlightStalled: checked ? 'true' : null,
                            })
                        }
                    >
                        <span>Highlight Stalled Deals</span>
                    </Checkbox>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={viewPreferences.currency === 'EUR'}
                        onChange={(checked) =>
                            appendQueryParams({
                                currency: checked ? 'EUR' : null,
                            })
                        }
                    >
                        <span>EUR Currency</span>
                    </Checkbox>
                </div>
            </div>
        </div>
    )
}

export default ViewPreferences
