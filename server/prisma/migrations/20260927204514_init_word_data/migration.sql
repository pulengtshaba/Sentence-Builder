BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[WordType] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [WordType_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [WordType_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Word] (
    [id] INT NOT NULL IDENTITY(1,1),
    [text] NVARCHAR(1000) NOT NULL,
    [wordTypeId] INT NOT NULL,
    CONSTRAINT [Word_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Word_text_wordTypeId_key] UNIQUE NONCLUSTERED ([text],[wordTypeId])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Word_wordTypeId_idx] ON [dbo].[Word]([wordTypeId]);

-- AddForeignKey
ALTER TABLE [dbo].[Word] ADD CONSTRAINT [Word_wordTypeId_fkey] FOREIGN KEY ([wordTypeId]) REFERENCES [dbo].[WordType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
