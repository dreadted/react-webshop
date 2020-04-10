import { useState, useEffect } from "react";

export enum SaveState {
  DEFAULT,
  DIRTY,
  SAVING,
  SAVED,
  DELETING,
  DELETED
}

type Flags = {
  isDirty: boolean;
  isSaving: boolean;
  isSaved: boolean;
  isDeleting: boolean;
  isDeleted: boolean;
};

type UseSaveState = () => [Flags, (state: SaveState) => void];

export const useSaveState: UseSaveState = () => {
  const [isDirty, setDirty] = useState<boolean>(false);
  const [isSaving, setSaving] = useState<boolean>(false);
  const [isSaved, setSaved] = useState<boolean>(false);
  const [isDeleting, setDeleting] = useState<boolean>(false);
  const [isDeleted, setDeleted] = useState<boolean>(false);

  useEffect(() => {
    if (isSaved) {
      setTimeout(() => setSaved(false), 1000);
    }
  }, [isSaved]);

  useEffect(() => {
    if (isSaving && isSaved) setSaving(false);
  }, [isSaving, isSaved]);

  useEffect(() => {
    if (isDeleted) {
      setTimeout(() => setDeleted(false), 1000);
    }
  }, [isDeleted]);

  useEffect(() => {
    if (isDeleting && isDeleted) setDeleting(false);
  }, [isDeleting, isDeleted]);

  const reducer = (state: SaveState) => {
    switch (state) {
      case SaveState.DIRTY:
        setSaved(false);
        setDirty(true);
        break;
      case SaveState.SAVING:
        setSaving(true);
        break;
      case SaveState.SAVED:
        setDirty(false);
        setSaved(true);
        break;
      case SaveState.DELETING:
        setDeleting(true);
        break;
    }
  };

  return [{ isDirty, isSaving, isSaved, isDeleting, isDeleted }, reducer];
};
