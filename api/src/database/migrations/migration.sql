
CREATE TABLE mv.cults (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT cults_pk PRIMARY KEY (id),
	CONSTRAINT cults_un UNIQUE (name)
);

CREATE TABLE mv.candidates (
	id int4 NOT NULL,
	"name" varchar NOT NULL,
	age int4 NOT NULL,
	cult int4 NOT NULL,
	CONSTRAINT candidates_pk PRIMARY KEY (id),
	CONSTRAINT candidates_fk FOREIGN KEY (cult) REFERENCES mv.cults(id)
);