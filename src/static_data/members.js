export class Member {
	static id = 0;
	constructor(
		fullName = '',
		role = '',
		about = '',
		inTeamSince = '',
		avatar = '',
		/**@type {String[]} */ personalAchievements = []
	) {
		this.id = ++Member.id;
		this.fullName = fullName;
		this.role = role;
		this.about = about;
		this.inTeamSince = inTeamSince;
		this.avatar = '/assets/images/team/' + avatar;
		this.personalAchievements = personalAchievements;
	}
}

export const members = [
	new Member(
		'Катерина Петровна',
		'Помощник Лидера группы',
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit aut tempora perferendis, harum inventore delectus necessitatibus. Velit, omnis corrupti. Cupiditate molestiae magnam consequatur officiis optio ex minima id repudiandae omnis fugit eaque debitis aliquam possimus repellendus enim ut, sequi adipisci. Aliquid aut suscipit ea nesciunt, minus eaque dolorum mollitia assumenda.',
		'20 мар. 2023г.',
		'micky_girl.jpeg'
	),

	new Member(
		'Семен Семеныч',
		'Лидер группы',
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione repellat a animi modi porro rerum est ea delectus maxime nulla.',
		'01 янв. 2023г.',
		'micky.jpeg',
		['3-х кратный Мастер продаж в 2024г.', 'Что-нибудь еще']
	),

	new Member(
		'Машуля Ивановна',
		'Супер-участник',
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione repellat a animi modi porro rerum est ea delectus maxime nulla.',
		'20 июл. 2024г.',
		'baby_duck.jpeg'
	),

	new Member(
		'Ашот Артурович',
		'Супер-участник',
		'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur vel doloremque, omnis explicabo ex hic autem dolor neque cumque tempora rem consequuntur facilis? Natus tempora ratione commodi, accusantium ipsa reiciendis illo omnis dolor, tenetur mollitia placeat! Aut, sequi at corrupti quis magni blanditiis totam, temporibus animi expedita ad voluptatibus quia, enim nemo. Tenetur saepe ex modi accusantium, sit corporis eveniet autem vitae provident, sint consequuntur, totam necessitatibus optio quaerat voluptates magnam. Dolore est, pariatur et nesciunt harum sit cumque quos incidunt! Ut dolores porro commodi recusandae explicabo id maxime, labore eaque laboriosam eum ducimus, deserunt beatae et. Quis, facere non consequuntur natus voluptates eius harum, magnam vero quisquam qui illo, nostrum maxime consectetur voluptas officia laudantium ullam minima? Ipsam velit ipsum nesciunt molestiae? Laudantium possimus veritatis incidunt optio magnam velit molestias numquam pariatur, non deserunt dolorem voluptatem vero harum id vel fuga, cupiditate consectetur tempore exercitationem quas sunt placeat? Molestias est quo, ipsam excepturi quam consequuntur incidunt quis, voluptatem delectus quos pariatur! Quo nihil aperiam, error a excepturi fugit hic nostrum praesentium magnam assumenda ullam! Magni asperiores earum quo suscipit nihil? Ad repudiandae ut hic natus veniam dolor voluptatibus temporibus voluptatem neque eos quidem, ducimus libero placeat perferendis officiis suscipit!',
		'10 янв. 2025г.',
		'pluto.jpeg',
		['Канкретний продавэц Уася']
	)
];
