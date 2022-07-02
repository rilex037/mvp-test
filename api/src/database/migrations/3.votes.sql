CREATE TABLE mv.votes (
	block_id int4 NOT NULL,
	user_address varchar NOT NULL,
	token_amount float8 NOT NULL DEFAULT 0.0,
	candidate_id int4 NOT NULL,
	CONSTRAINT votes_pk PRIMARY KEY (block_id),
	CONSTRAINT votes_un UNIQUE (user_address),
	CONSTRAINT votes_fk FOREIGN KEY (candidate_id) REFERENCES mv.candidates(id)
);