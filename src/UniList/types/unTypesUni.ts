import type { UtWithid } from "../../types-ut";

/** Техническое сообщение об ошибке, не для отображения в UI */
export type Un14nFailMsgTech = string;

/** Сообщение об ошибке для отображения в UI */
export type Un15nFailMsgUi = string;

/** Условный код ошибки */
export type Un16nFailCode = string;

/** Детальная информация об ошибке */
interface Un6nFailDetails {
    failCode?: Un16nFailCode;
    failMsgTech?: Un14nFailMsgTech;
    failMsgUi?: Un15nFailMsgUi;
    /** ошибка; для использования когда result === 'fail' */
    error?: any;
}

/** Результат операции, с данными и hasMore */
export interface Un4nResult<TData = any> extends Un6nFailDetails {
    result: 'success' | 'fail';
    data?: TData;
    hasMore?: boolean;
}

/** Результат операции, без данных */
export interface Un5nResult extends Un6nFailDetails {
    result: 'success' | 'fail';
}

export interface Un18nFailWithId extends UtWithid, Un6nFailDetails {
    
}

/** Результат выполнения нескольких операций */
export interface Un17nResultMult {
    /** 
     * 'success' означает что все операции выполнены успешно
     * 'success-some' означает что некоторые операции завершились неудачей
     * 'fail' означает что все операции завершились неудачей
     */
    result: 'success' | 'success-some' | 'fail';
    /** информация об успешно выполненных операциях */
    successList: UtWithid[];
    /** информация об операциях, которые завершились неудачей */
    failList?: Un18nFailWithId[];
}

export interface Un19nRusultSuccess {
    result: 'success';
}
export interface Un20nRusultSuccessSome {
    result: 'success-some';
    successList: UtWithid[];
    failList: Un18nFailWithId[];
}
export interface Un21nRusultFail {
    result: 'fail';
    failList: Un18nFailWithId[];
}

/** Результат выполнения нескольких операций */
export type Un22nResult = Un19nRusultSuccess | Un20nRusultSuccessSome | Un21nRusultFail;