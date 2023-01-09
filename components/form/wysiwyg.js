import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { EditorState, convertToRaw } from 'draft-js';

import dynamic from 'next/dynamic';
import styles from '../../styles/component.module.scss';
import { useEffect } from 'react';
import { useState } from 'react';

const Editor = dynamic(
	() => import('react-draft-wysiwyg').then((mod) => mod.Editor),
	{ ssr: false },
);
export default function WysiwygComponent({ field }) {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	useEffect(() => {
		if (field.value) {
			setEditorState(field.value);
		}
	}, []);

	const onEditorStateChange = (state) => {
		setEditorState(state);
		const content = JSON.stringify(
			convertToRaw(editorState.getCurrentContent()),
		);
		field.onChange(content);
	};
	// console.log(editorState.getCurrentContent().getPlainText(''));

	return (
		<div>
			<div className={styles.wysiwyg}>
				<Editor
					{...field}
					toolbarClassName='toolbarClassName'
					style={{ height: '500px', border: '1px solid' }}
					wrapperClassName={styles.wrapperClass}
					editorClassName='editorClassName'
					editorState={editorState}
					onEditorStateChange={onEditorStateChange}
				/>
			</div>
		</div>
	);
}
