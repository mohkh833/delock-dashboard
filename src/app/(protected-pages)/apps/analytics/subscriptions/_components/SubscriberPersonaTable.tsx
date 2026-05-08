'use client'
import { useState } from 'react'
import Segment from '@/components/ui/Segment'
import Card from '@/components/ui/Card'
import PersonaTableSection from './PersonaTableSection'
import type { SubscriberPersonasData } from './types'

type SubscriberPersonaTableProps = {
    personas: SubscriberPersonasData
}

const SubscriberPersonaTable = ({ personas }: SubscriberPersonaTableProps) => {
    const [selectedPersona, setSelectedPersona] = useState('recentSubscribers')

    return (
        <Card bodyClass="p-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
                <div>
                    <h5>Subscriber Personas</h5>
                    <p>
                        Detailed analysis of subscriber segments and engagement
                        patterns
                    </p>
                </div>
                <Segment
                    value={selectedPersona}
                    onChange={setSelectedPersona}
                    className="w-full md:w-auto"
                >
                    <Segment.Item
                        className="rounded-lg"
                        value="recentSubscribers"
                    >
                        Recent
                    </Segment.Item>
                    <Segment.Item
                        className="rounded-lg"
                        value="highValueSubscribers"
                    >
                        High Value
                    </Segment.Item>
                </Segment>
            </div>
            <div className="py-4">
                {selectedPersona === 'recentSubscribers' && (
                    <PersonaTableSection data={personas.recent} />
                )}
                {selectedPersona === 'highValueSubscribers' && (
                    <PersonaTableSection data={personas.highValue} />
                )}
            </div>
        </Card>
    )
}

export default SubscriberPersonaTable
