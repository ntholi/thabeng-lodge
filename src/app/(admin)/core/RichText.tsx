import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import '@mantine/tiptap/styles.css';
import { InputWrapper } from '@mantine/core';
import { useEffect } from 'react';

type Props = {
  value: string | undefined;
  onChange: (value: string) => void;
  label: string;
  checked?: boolean;
  error?: string;
  onFocused?: () => void;
  onBlurred?: () => void;
  height?: number;
  defaultValue?: string;
};

export default function RichText(props: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Link,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: props.value || props.defaultValue || '',
  });

  useEffect(() => {
    editor?.commands.setContent(props.value || '');
  }, [props.value]);

  editor?.on('update', () => {
    props.onChange(editor.getHTML());
  });

  return (
    <InputWrapper label={props.label} mt='sm'>
      <RichTextEditor mih={props.height || 300} editor={editor}>
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content />
      </RichTextEditor>
    </InputWrapper>
  );
}
