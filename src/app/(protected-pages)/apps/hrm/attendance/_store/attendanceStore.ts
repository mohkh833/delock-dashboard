import { create } from 'zustand'
import type {
    ViewMode,
    AttendanceRecord,
    GetAttendanceResponse,
} from '../types'

type AttendanceState = {
    data: GetAttendanceResponse
    initialLoading: boolean
    viewMode: ViewMode
    selectedRows: AttendanceRecord[]
    selectedRecord: AttendanceRecord | null
    markAttendanceOpen: boolean
    deleteDialogOpen: boolean
}

type AttendanceActions = {
    setData: (data: GetAttendanceResponse) => void
    setInitialLoading: (loading: boolean) => void
    setViewMode: (mode: ViewMode) => void
    setSelectedRows: (rows: AttendanceRecord[]) => void
    addSelectedRow: (row: AttendanceRecord) => void
    removeSelectedRow: (rowId: string) => void
    clearSelectedRows: () => void
    setSelectedRecord: (record: AttendanceRecord | null) => void
    setMarkAttendanceOpen: (open: boolean) => void
    setDeleteDialogOpen: (open: boolean) => void
    updateRecord: (id: string, updates: Partial<AttendanceRecord>) => void
    deleteRecord: (id: string) => void
    bulkDeleteRecords: (ids: string[]) => void
}

const initialState: AttendanceState = {
    data: {
        records: [],
        metrics: {
            presentToday: 0,
            absentToday: 0,
            lateArrivals: 0,
            attendanceRate: 0,
        },
        total: 0,
    },
    initialLoading: true,
    viewMode: 'list',
    selectedRows: [],
    selectedRecord: null,
    markAttendanceOpen: false,
    deleteDialogOpen: false,
}

export const useAttendanceStore = create<AttendanceState & AttendanceActions>()(
    (set) => ({
        ...initialState,
        setData: (data) => set({ data }),
        setInitialLoading: (loading) => set({ initialLoading: loading }),
        setViewMode: (mode) => set({ viewMode: mode }),
        setSelectedRows: (rows) => set({ selectedRows: rows }),
        addSelectedRow: (row) =>
            set((state) => ({ selectedRows: [...state.selectedRows, row] })),
        removeSelectedRow: (rowId) =>
            set((state) => ({
                selectedRows: state.selectedRows.filter((r) => r.id !== rowId),
            })),
        clearSelectedRows: () => set({ selectedRows: [] }),
        setSelectedRecord: (record) => set({ selectedRecord: record }),
        setMarkAttendanceOpen: (open) => set({ markAttendanceOpen: open }),
        setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),
        updateRecord: (id, updates) =>
            set((state) => ({
                data: {
                    ...state.data,
                    records: state.data.records.map((r) =>
                        r.id === id ? { ...r, ...updates } : r,
                    ),
                },
            })),
        deleteRecord: (id) =>
            set((state) => ({
                data: {
                    ...state.data,
                    records: state.data.records.filter((r) => r.id !== id),
                    total: state.data.total - 1,
                },
            })),
        bulkDeleteRecords: (ids) =>
            set((state) => ({
                data: {
                    ...state.data,
                    records: state.data.records.filter(
                        (r) => !ids.includes(r.id),
                    ),
                    total: state.data.total - ids.length,
                },
                selectedRows: [],
            })),
    }),
)
