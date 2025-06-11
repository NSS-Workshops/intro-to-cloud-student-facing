import { introductionWorkshop2Chapter } from './introduction';

export const introToWorkshop2Chapters = [
  introductionWorkshop2Chapter
];

/**
 * Get a chapter by its ID
 * @param {string} id - The chapter ID to find
 * @returns {Object|undefined} The chapter object if found, undefined otherwise
 */
export const getChapterById = (id) => {
  return introToWorkshop2Chapters.find(chapter => chapter.id === id);
};

/**
 * Get all chapter IDs for the CI/CD introduction section
 * @returns {string[]} Array of chapter IDs
 */
export const getChapterIds = () => {
  return introToWorkshop2Chapters.map(chapter => chapter.id);
};

/**
 * Get the next chapter after the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The next chapter object if found, undefined otherwise
 */
export const getNextChapter = (currentChapterId) => {
  const currentIndex = introToWorkshop2Chapters.findIndex(chapter => chapter.id === currentChapterId);
  return introToWorkshop2Chapters[currentIndex + 1];
};

/**
 * Get the previous chapter before the given chapter ID
 * @param {string} currentChapterId - The current chapter ID
 * @returns {Object|undefined} The previous chapter object if found, undefined otherwise
 */
export const getPreviousChapter = (currentChapterId) => {
  const currentIndex = introToWorkshop2Chapters.findIndex(chapter => chapter.id === currentChapterId);
  return currentIndex > 0 ? introToWorkshop2Chapters[currentIndex - 1] : undefined;
};