drop database if exists dbDel2;
create database dbDel2 character set utf8mb4 collate utf8mb4_general_ci;
use dbDel2;

create table person(
id int primary key Auto_increment,
name varchar(50)
);

create table task(
id int auto_increment primary key,
taskName varchar(50),
timeStart date,
timeEnd date
);

create table project(
person int,
task int,
foreign key (person) references  person(id) on delete cascade on update cascade,
foreign key (task) references task(id) on delete cascade on update cascade
);

insert into person(name) values('Allan');
insert into person(name) values('Beritt');
insert into person(name) values('Conny');
insert into person(name) values('Danny');
insert into person(name) values('Erling');
insert into person(name) values('Finn');
insert into person(name) values('Gunnar');
insert into person(name) values('test');

insert into task(taskName, timeStart, timeEnd) values('Plan', '2022-01-01', '2022-01-02');
insert into task(taskName, timeStart, timeEnd) values('Product', '2022-01-10', '2022-01-11');
insert into task(taskName, timeStart, timeEnd) values('Process', '2022-01-20', '2022-01-21');
insert into task(taskName, timeStart, timeEnd) values('Delivery', '2022-2-12', '2022-2-13');
insert into task(taskName, timeStart, timeEnd) values('test', '2022-2-12', '2022-2-13');



insert into project (person, task) values ((select id from person where name = 'Allan'),(select id from task where taskName = 'Plan' ));
insert into project (person, task) values ((select id from person where name = 'Beritt'),(select id from task where taskName = 'Plan' ));
insert into project (person, task) values ((select id from person where name = 'Conny'),(select id from task where taskName = 'Plan' ));
insert into project (person, task) values ((select id from person where name = 'Danny'),(select id from task where taskName = 'Product' ));
insert into project (person, task) values ((select id from person where name = 'Erling'),(select id from task where taskName = 'Process' ));
insert into project (person, task) values ((select id from person where name = 'Finn'),(select id from task where taskName = 'Delivery' ));
insert into project (person, task) values ((select id from person where name = 'Gunnar'),(select id from task where taskName = 'Delivery' ));
insert into project (person, task) values ((select id from person where name = 'Allan'),(select id from task where taskName = 'Delivery' ));
insert into project (person, task) values ((select id from person where name = 'Allan'),(select id from task where taskName = 'Product' ));
insert into project (person, task) values ((select id from person where name = 'Beritt'),(select id from task where taskName = 'Process' ));
insert into project (person, task) values ((select id from person where name = 'test'),(select id from task where taskName = 'test' ));


delete from project where person = (select id from person where person.name = 'test');


update person set name = "test2" where name = 'test';

delete from person where name = 'test2';

update task set taskName = "test2" where taskName = "test";

delete from task where taskName = 'test2';

select * from project where person = (select id from person where person.name = 'Allan'); 
select * from project where person = (select id from person where person.name = 'Beritt'); 

SELECT project.task, task.taskName, project.person, person.name
FROM project
LEFT JOIN person ON project.person = person.id
LEFT JOIN task ON project.task = task.id
WHERE task.id = (select id from task where taskName = 'Process');

SELECT project.task, task.taskName, project.person, person.name
FROM project
LEFT JOIN person ON project.person = person.id
LEFT JOIN task ON project.task = task.id
WHERE task.id = (select id from task where taskName = 'Plan');