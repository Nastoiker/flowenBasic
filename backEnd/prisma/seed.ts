import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// const userData: Prisma.BrandCreateInput[] = [
// 	{
// 		name: 'Xiaomi',
// 	},
// 	{
// 		name: 'Lenovo',
// 	},
// 	{
// 		name: 'OPPO',
// 	},
// 	{
// 		name: 'Apple',
// 	},
// 	{
// 		name: 'Samsung',
// 	},
// ];
// const userData: Prisma.TagCreateInput[] = [
// 	{
// 		name: 'Популярные',
// 	},
// 	{
// 		name: 'Дешевые',
// 	},
// 	{
// 		name: 'Беспроводные',
// 	},
// 	{
// 		name: 'Скидка',
// 	},
// 	{
// 		name: 'Новые',
// 	},
// ];
// const userData: Prisma.ModelDeviceCreateInput[] = [
// 	{
// 		name: 'airDots',
// 	},
// 	{
// 		name: 'LP40',
// 	},
// 	{
// 		name: 'ENCO AIR 2',
// 	},
// 	{
// 		name: 'airpods pro',
// 	},
// 	{
// 		name: 'EHS64',
// 	},
// ];
// const userData: Prisma.FirstLevelCategoryCreateInput[] = [
// 	{
// 		name: 'Техника',
// 	},
// 	{
// 		name: 'Книги',
// 	},
// 	{
// 		name: 'Блоги',
// 	},
// ];
// const userData: Prisma.SecondLevelCategoryCreateInput[] = [
// 	{
// 		name: 'Наушники',
// 		firstLevelId: 1,
// 	},
// 	{
// 		name: 'Повербанк',
// 		firstLevelId: 1,
// 	},
// 	{
// 		name: 'Телефоны',
// 		firstLevelId: 1,
// 	},
// ];
// const userData: Prisma.SecondLevelCategoryCreateInput[] = [
// 	{
// 		id: 'Наушники',
// 		firstLevelId: 1,
// 	},
// 	{
// 		id: 'Повербанк',
// 		firstLevelId: 1
// 	},
// 	{
// 		id: 'Телефоны',
// 		firstLevelId: 1,
// 	},
// ];

// async function main() {
// 	console.log(`Start seeding ...`);
// 	for (const u of userData) {
// 		const user = await prisma.secondLevelCategory.create({
// 			data: u,
// 		});
// 		console.log(`Created user with id: ${user.id}`);
// 	}
// 	console.log(`Seeding finished.`);
// }

// main()
// 	.then(async () => {
// 		await prisma.$disconnect();
// 	})
// 	.catch(async (e) => {
// 		console.error(e);
// 		await prisma.$disconnect();
// 		process.exit(1);
// 	});
