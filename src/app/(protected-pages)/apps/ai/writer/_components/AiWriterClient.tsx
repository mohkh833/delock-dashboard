'use client'

import { useEffect, useRef } from 'react'
import { useAiWriterStore } from '../_store/aiWriterStore'
import Drawer from '@/components/ui/Drawer'
import useResponsive from '@/utils/hooks/useResponsive'
import WorkSpace from './WorkSpace'
import WriterSidePanel from './WriterSidePanel'
import WriterSidePanelContent from './WriterSidePanelContent'
import { useEditor } from '@tiptap/react'
import { Highlight } from './Highlight'
import StarterKit from '@tiptap/starter-kit'
import { apiPostWriter } from '@/services/client/AiService'

const defaultGenerateParams = {
    topic: 'The Rise of Artificial Intelligence in Modern Business',
    language: 'English',
    articleType: 'article',
    tone: 'noTone',
}

const AiWriterClient = () => {
    const { larger } = useResponsive()
    const hasInitialized = useRef(false)

    const content = useAiWriterStore((state) => state.content)
    const generated = useAiWriterStore((state) => state.generated)
    const sidePanelOpen = useAiWriterStore((state) => state.sidePanelOpen)
    const setSidePanelOpen = useAiWriterStore((state) => state.setSidePanelOpen)
    const setLastFocusPoint = useAiWriterStore(
        (state) => state.setLastFocusPoint,
    )
    const setShowBubbleMenu = useAiWriterStore(
        (state) => state.setShowBubbleMenu,
    )
    const setContent = useAiWriterStore((state) => state.setContent)
    const setGenerating = useAiWriterStore((state) => state.setGenerating)
    const setGenerated = useAiWriterStore((state) => state.setGenerated)

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                },
                orderedList: {
                    keepMarks: true,
                },
            }),
            Highlight,
        ],
        editorProps: {
            attributes: {
                class: 'focus:outline-hidden h-full p-2',
            },
        },
        immediatelyRender: false,
        onSelectionUpdate(props) {
            const { view, state } = props.editor

            try {
                if (!view?.dom) {
                    return
                }
            } catch {
                return
            }

            const { from, to, anchor } = view.state.selection
            const text = state.doc.textBetween(from, to, '')

            setLastFocusPoint(anchor)

            if (text.length > 0) {
                setShowBubbleMenu(true)
                return
            }
            setShowBubbleMenu(false)
        },
        content,
    })

    useEffect(() => {
        const generateInitialContent = async () => {
            if (hasInitialized.current || generated) return
            hasInitialized.current = true

            setGenerating(true)
            try {
                const resp = await apiPostWriter<
                    { content: string },
                    typeof defaultGenerateParams
                >(defaultGenerateParams)
                if (resp?.content) {
                    setContent(resp.content)
                    setGenerated(true)
                }
            } catch (error) {
                console.error('Failed to generate initial content:', error)
            } finally {
                setGenerating(false)
            }
        }

        generateInitialContent()
    }, [generated, setContent, setGenerating, setGenerated])

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content)
        }
    }, [content, editor])

    return (
        <div className="flex flex-auto gap-4 h-full">
            {editor && (
                <>
                    <WorkSpace editor={editor} />
                    {larger.xl ? (
                        <WriterSidePanel editor={editor} />
                    ) : (
                        <Drawer
                            isOpen={sidePanelOpen}
                            width={400}
                            placement="left"
                            bodyClass="p-0"
                            closable={false}
                            onClose={() => setSidePanelOpen(false)}
                        >
                            <WriterSidePanelContent editor={editor} />
                        </Drawer>
                    )}
                </>
            )}
        </div>
    )
}

export default AiWriterClient
