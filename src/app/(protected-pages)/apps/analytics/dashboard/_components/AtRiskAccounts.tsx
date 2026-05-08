'use client'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import Tag from '@/components/ui/Tag'
import Badge from '@/components/ui/Badge'
import type { AtRiskAccountsData } from '../types'

type AtRiskAccountsProps = {
    data: AtRiskAccountsData
}

const AtRiskAccounts = ({ data }: AtRiskAccountsProps) => {
    const { accounts } = data

    const formatCurrency = (value: number) => `${(value / 1000).toFixed(0)}k`

    return (
        <Card>
            <div className="mb-4">
                <h5>At Risk Accounts</h5>
            </div>
            <Table hoverable={false} bordered={false} compact>
                <Table.THead>
                    <Table.Tr className="bg-transparent">
                        <Table.Th>Customer</Table.Th>
                        <Table.Th className="text-right text-nowrap">
                            Health
                        </Table.Th>
                    </Table.Tr>
                </Table.THead>
                <Table.TBody>
                    {accounts.map((account) => {
                        const getStatusColors = () => {
                            if (account.riskLevel === 'critical') {
                                return 'bg-error'
                            } else if (account.riskLevel === 'warning') {
                                return 'bg-warning'
                            } else {
                                return 'bg-success'
                            }
                        }

                        const getStatusText = () => {
                            if (account.riskLevel === 'critical') {
                                return 'Critical'
                            } else if (account.riskLevel === 'warning') {
                                return 'At Risk'
                            } else {
                                return 'Active'
                            }
                        }

                        return (
                            <Table.Tr key={account.id}>
                                <Table.Td className="w-full">
                                    <div className="flex items-center gap-4 py-1">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            className="bg-transparent h-7"
                                            src={account.avatar}
                                            alt={account.companyName}
                                        />
                                        <div className="flex-1">
                                            <div className="heading-text font-medium">
                                                {account.companyName}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span>
                                                    ARR:{' '}
                                                    <span className="font-medium">
                                                        {formatCurrency(
                                                            account.arr,
                                                        )}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Table.Td>
                                <Table.Td className="text-right">
                                    <div className="text-right">
                                        <Tag className="bg-transparent gap-1">
                                            <Badge
                                                className={getStatusColors()}
                                            />
                                            <span>{getStatusText()}</span>
                                        </Tag>
                                    </div>
                                </Table.Td>
                            </Table.Tr>
                        )
                    })}
                </Table.TBody>
            </Table>
        </Card>
    )
}

export default AtRiskAccounts
