module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS public.domains
      (
          id serial NOT NULL,
          name character varying(255) COLLATE pg_catalog."default" NOT NULL UNIQUE,
          status boolean NOT NULL,
          assigned_to integer,
          created_at timestamp with time zone DEFAULT now(),
          CONSTRAINT domains_pkey PRIMARY KEY (id)
      );
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('domains');
  },
};
