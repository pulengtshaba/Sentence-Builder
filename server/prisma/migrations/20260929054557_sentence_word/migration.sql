BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Sentence] (
    [id] INT NOT NULL IDENTITY(1,1),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Sentence_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Sentence_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[SentenceWord] (
    [id] INT NOT NULL IDENTITY(1,1),
    [sentenceId] INT NOT NULL,
    [wordId] INT NOT NULL,
    [position] INT NOT NULL,
    CONSTRAINT [SentenceWord_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [SentenceWord_sentenceId_position_key] UNIQUE NONCLUSTERED ([sentenceId],[position])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Sentence_createdAt_idx] ON [dbo].[Sentence]([createdAt]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [SentenceWord_sentenceId_idx] ON [dbo].[SentenceWord]([sentenceId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [SentenceWord_wordId_idx] ON [dbo].[SentenceWord]([wordId]);

-- AddForeignKey
ALTER TABLE [dbo].[SentenceWord] ADD CONSTRAINT [SentenceWord_sentenceId_fkey] FOREIGN KEY ([sentenceId]) REFERENCES [dbo].[Sentence]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SentenceWord] ADD CONSTRAINT [SentenceWord_wordId_fkey] FOREIGN KEY ([wordId]) REFERENCES [dbo].[Word]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
