import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Editor } from 'react-draft-wysiwyg';
import { Typography } from '@mui/material';

export default function HomePage() {
	return (
		<div>
			<Typography variant='h4'>Event Management</Typography>
			<br />
			<Editor
				toolbarClassName='toolbarClassName'
				style={{ height: '500px', border: '1px solid' }}
				wrapperClassName='wrapperClassName'
				editorClassName='editorClassName'
			/>
		</div>
	);
}
