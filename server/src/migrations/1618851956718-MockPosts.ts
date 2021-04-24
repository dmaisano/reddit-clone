import { MigrationInterface, QueryRunner } from "typeorm";

export class MockPosts1618851956718 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`insert into post ("creatorId", title, text, "createdAt") values (3, 'Change of Habit', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', '9/7/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, '3 Needles', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', '11/24/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Paintball', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', '10/27/2020');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Turning, The', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', '9/9/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Stalin', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', '4/21/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'No More School', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', '3/11/2021');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Blood of Dracula', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', '12/2/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'One-Eyed Jacks', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', '10/20/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Ce que mes yeux ont vu', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', '2/27/2021');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Another Chance', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.

Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', '4/27/2020');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Howling, The', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', '6/26/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Black Robe', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', '12/8/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Girlhood', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', '7/10/2020');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Match Point', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', '8/12/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Magic Flute, The (Trollflöjten)', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', '3/19/2021');
insert into post ("creatorId", title, text, "createdAt") values (1, 'When the Levees Broke: A Requiem in Four Acts', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.

Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', '8/7/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Ghost Machine', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', '6/30/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Bill Maher: Victory Begins at Home', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', '4/11/2021');
insert into post ("creatorId", title, text, "createdAt") values (1, 'The Last Diamond', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', '2/3/2021');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Fire Over England', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', '4/17/2021');
insert into post ("creatorId", title, text, "createdAt") values (1, 'That Cold Day in the Park', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', '12/26/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Fabulous Baker Boys, The', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', '5/17/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Stardust', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', '8/14/2020');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Mon Paradis - Der Winterpalast', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', '6/10/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Chair, The', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', '8/23/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Duplicity', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', '2/12/2021');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Scourge', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', '3/30/2021');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Film Noir: Bringing Darkness to Light', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', '7/17/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Take This Waltz', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '11/19/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Plastic Bag', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.

Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', '11/9/2020');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Armstrong Lie, The', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', '6/6/2020');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Caveman''s Valentine, The', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.

Fusce consequat. Nulla nisl. Nunc nisl.', '8/7/2020');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Chamber of Death (Chambre des morts, La)', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.

Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', '9/14/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Adam''s Rib', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', '2/10/2021');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Pest, The', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', '7/22/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Ugly Truth, The', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', '6/9/2020');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Hitler''s Stealth Fighter', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', '8/15/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Separation, A (Jodaeiye Nader az Simin)', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', '1/9/2021');
insert into post ("creatorId", title, text, "createdAt") values (2, 'The Town that Dreaded Sundown', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', '7/23/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Dragonheart 3: The Sorcerer''s Curse', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', '1/12/2021');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Woman''s Face, A (En kvinnas ansikte) ', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.', '7/23/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Bandslam', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', '2/20/2021');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Casanova', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', '1/22/2021');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Noise', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', '5/8/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'People on Sunday (Menschen am Sonntag)', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.

In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', '4/13/2021');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Georgia', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.', '6/7/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Little Otik (Otesánek)', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', '6/7/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Frank McKlusky, C.I.', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', '7/12/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Children of the Corn 666: Isaac''s Return', 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', '4/17/2021');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Papa', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', '7/4/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Prison Terminal: The Last Days of Private Jack Hall', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', '12/27/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, '2 Fast 2 Furious (Fast and the Furious 2, The)', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', '5/10/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Occupants, The', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.

Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', '4/22/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Brave New World', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', '9/19/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'The Forgotten Space', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', '3/31/2021');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Stolen Face', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2/21/2021');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Drinking Buddies', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', '4/18/2021');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Shaolin Soccer (Siu lam juk kau)', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.

Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', '4/25/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'What''s Your Number?', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.

In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', '3/9/2021');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Christiane F. (a.k.a. We Children from Bahnhof Zoo) (Christiane F. - Wir Kinder vom Bahnhof Zoo)', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', '5/30/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'The Green', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', '12/31/2020');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Scenes From a Marriage (Scener ur ett äktenskap)', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.', '5/13/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Immortals', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.

In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', '1/8/2021');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Garage', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', '6/26/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Soft Skin, The (La peau douce)', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '7/22/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Those Magnificent Men in Their Flying Machines', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', '7/2/2020');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Wrong Is Right (a.k.a. The Man With the Deadly Lens)', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', '9/18/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Night Nurse', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.

Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', '11/24/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Sylvia', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', '8/29/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Caddyshack', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', '10/23/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Border Run (Mule, The)', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', '1/19/2021');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Honeydripper', 'In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', '12/9/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Beyond Hypothermia (Sip si 32 doe)', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', '8/28/2020');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Take This Job and Shove It', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', '11/25/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Wizard, The', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', '9/13/2020');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Harold and Kumar Go to White Castle', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', '1/27/2021');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Tatie Danielle', 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', '4/28/2020');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Man from Down Under, The', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.

In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', '1/29/2021');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Charlotte Sometimes', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', '1/20/2021');
insert into post ("creatorId", title, text, "createdAt") values (1, 'SSSSSSS', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', '6/28/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Blind Faith', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', '11/28/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Boris and Natasha', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', '9/22/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Horsemen', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', '1/14/2021');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Beyond the Forest', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', '5/16/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Codependent Lesbian Space Alien Seeks Same', 'In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', '3/17/2021');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Thirty-Five Something (Tout pour plaire)', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.

Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.', '6/25/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Special Day, A (Giornata particolare, Una)', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', '12/28/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'House of Small Cubes, The (Tsumiki no ie)', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.

Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', '12/14/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Secrets of Jonathan Sperry, The', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', '3/11/2021');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Back to the USSR - takaisin Ryssiin', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', '11/24/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Man Without a Past, The (Mies vailla menneisyyttä)', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', '10/2/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Early Summer (Bakushû)', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.

Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', '3/24/2021');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Blueberry', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', '6/9/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'In Enemy Hands', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.

In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.

Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', '8/24/2020');
insert into post ("creatorId", title, text, "createdAt") values (1, 'Bill Burr: Let It Go', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.

Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.', '1/15/2021');
insert into post ("creatorId", title, text, "createdAt") values (3, 'High Road to China', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', '8/8/2020');
insert into post ("creatorId", title, text, "createdAt") values (3, 'Asoka (Ashoka the Great)', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', '12/23/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Brain That Wouldn''t Die, The', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', '11/30/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Terri', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.

Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', '11/12/2020');
insert into post ("creatorId", title, text, "createdAt") values (2, 'Mary and Martha', 'Fusce consequat. Nulla nisl. Nunc nisl.', '11/1/2020');
`);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
