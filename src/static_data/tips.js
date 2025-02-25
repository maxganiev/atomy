function imagePath(imageName = '') {
	return '/assets/images/svg/' + imageName;
}

function videoPath(videoName = '') {
	return '/assets/videos/' + videoName + '.mp4';
}

export const tips = [
	{
		id: 1,
		title: 'Общая информация',
		description:
			'<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus velit repellat nemo, hic aliquam assumenda impedit, atque placeat ipsam laboriosam commodi dolores asperiores eaque beatae dignissimos exercitationem libero autem sint.</p>',
		icon: imagePath('info.svg')
	},

	{
		id: 2,
		title: 'Регистрация',
		description:
			'<p>Lorem ipsum, dolor sit amet consectetur adipisicing <a href="https://www.atomy.ru/ru/Home/Account/MemberJoin" target="_blank">elit</a>.Doloremque dicta, omnis maxime porro nemo perferendis!</p>',
		icon: imagePath('registration.svg')
	},

	{
		id: 3,
		title: 'Личный кабинет',
		description:
			'<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus exercitationem distinctio voluptatum veritatis atque earum nihil fuga officiis aliquid. Pariatur nemo mollitia ea libero laudantium, inventore dignissimos tempore officia quibusdam dolore et accusamus facilis sint in, deserunt minus fuga qui.</p>',
		icon: imagePath('user.svg')
	},

	{
		id: 4,
		title: 'Структура (про ветки и проч)',
		description:
			'<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem blanditiis qui maiores voluptatum veniam facere a harum quidem perspiciatis omnis reprehenderit tempore soluta ducimus libero, quo praesentium vero vel quasi tenetur saepe eos nemo magni tempora cum. Obcaecati numquam at, veritatis, ut eligendi amet asperiores molestias, quod corrupti nemo quam magni aliquam ad. Ut qui explicabo illo pariatur autem, sunt adipisci labore molestias modi corrupti eius doloremque ducimus sint a culpa praesentium dolorem officiis, recusandae beatae porro laudantium nobis. Odit iste minima tempora possimus tempore, rem molestiae cupiditate? Totam numquam incidunt dignissimos et fugiat corporis quos quod velit nemo dolorem.</p>',
		icon: imagePath('org.svg')
	},

	{
		id: 5,
		title: 'Система начислений',
		description:
			'<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis adipisci fugit, repellendus libero rem minima molestias quam error repudiandae, autem in maxime enim ipsa dolores recusandae quasi animi repellat impedit quibusdam. Error ullam nam asperiores vero aliquid fuga laboriosam nulla, ipsa repellendus cupiditate provident dolorem sequi iusto, eligendi expedita unde quia rem fugiat! Dicta ab consequatur hic odit, aspernatur est cupiditate maiores maxime, tenetur quam enim ea quisquam quis, quo in ratione mollitia iste a.</p>',
		icon: imagePath('cash.svg')
	},

	{
		id: 7,
		title: '... и т.д.',
		description: `<video controls src="${videoPath(
			'mp'
		)}" class="w-4/5 mt-12 xs-height:h-1/2 xs-height:mt-6 mx-auto"></video>`,
		icon: null
	}
];
