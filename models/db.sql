create database if not exists sumo;
use sumo;
create table if not exists users(
        sid int unsigned not null,
        pviews int,
        primary key(sid)
);

create table if not exists questions(
        qid int unsigned not null,
        body text,
        primary key(qid)
);

create table if not exists accounts(
        username varchar(50),
        password varchar(50),
        isadmin bool
);

create table if not exists answers(
        userssid int unsigned not null,
        questionsqid int unsigned not null,
        body text,
        foreign key(userssid) references users(sid),
        foreign key(questionsqid) references questions(qid),
        primary key(userssid, questionsqid)
);
             
create table if not exists usercount(
        counter int 
);  
    


