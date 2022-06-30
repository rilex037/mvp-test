CREATE TABLE mv.candidates (
	id int4 NOT NULL,
	"name" varchar NOT NULL,
	age int4 NOT NULL,
	cult_id int4 NOT NULL,
	CONSTRAINT candidates_pk PRIMARY KEY (id),
	CONSTRAINT candidates_fk FOREIGN KEY (cult_id) REFERENCES mv.cults(id)
);