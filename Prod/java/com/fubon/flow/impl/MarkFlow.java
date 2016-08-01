package com.fubon.flow.impl;

import com.fubon.flow.ILogic;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/7/6
 * Time: 下午 4:38
 * To change this template use File | Settings | File Templates.
 */
public abstract class MarkFlow implements ILogic {
    protected boolean isMark = true;

    public boolean isMark() {
        return isMark;
    }

    public void setMark(boolean mark) {
        isMark = mark;
    }
}
