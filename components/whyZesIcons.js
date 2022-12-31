import Image from 'next/image';
import { useState } from 'react';

export default function WhyZesIcons({ item, index }) {
	return (
		<div key={item.name} className='category-item col-sm-12 col-lg-4'>
			<div className='category-icon'>
				<Image
					src={`/home/icon${index + 1}.png`}
					alt={item.name}
					width={53}
					height={53}
				/>
			</div>
			<br />
			<a href='#' className='category-title'>
				{item.name}
			</a>
			<p className='category-caption'>{item.description}</p>
		</div>
	);
}
// filter: brightness(0) invert(1);
