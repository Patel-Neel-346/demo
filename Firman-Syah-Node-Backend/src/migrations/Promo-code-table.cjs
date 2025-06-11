module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TYPE enum_promocode_discount_type AS ENUM ('percentage', 'fixed');
      CREATE TYPE enum_promocode_status AS ENUM ('active', 'inactive');

      CREATE TABLE IF NOT EXISTS public.promocodes
      (
          id serial NOT NULL,
          code character varying(255) COLLATE pg_catalog."default" NOT NULL UNIQUE,
          discount_type enum_promocode_discount_type NOT NULL,
          discount_value numeric(10,2) NOT NULL,
          status enum_promocode_status NOT NULL DEFAULT 'active',
          expires_at timestamp with time zone,
          usage_limit integer DEFAULT 0,
          used integer DEFAULT 0,
          assigned_to integer,
          created_at timestamp with time zone DEFAULT now(),
          updated_at timestamp with time zone DEFAULT now(),
          CONSTRAINT promocodes_pkey PRIMARY KEY (id),
          CONSTRAINT check_discount_value CHECK (discount_value > 0),
          CONSTRAINT check_usage_limit CHECK (usage_limit >= 0),
          CONSTRAINT check_used CHECK (used >= 0 AND used <= usage_limit)
      );

      CREATE INDEX idx_promocodes_code ON public.promocodes(code);
      CREATE INDEX idx_promocodes_status ON public.promocodes(status);
      CREATE INDEX idx_promocodes_assigned_to ON public.promocodes(assigned_to);
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('promocodes');
    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS enum_promocode_discount_type;
      DROP TYPE IF EXISTS enum_promocode_status;
    `);
  },
};
